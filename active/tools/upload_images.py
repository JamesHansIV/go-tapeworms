'''
    This script uploads images to the s3 images bucket, 
    then adds the links the files were added to to the correct mongo documents
'''

import os
import sys
import dotenv
from progressbar import progressbar
import boto3
import pymongo
import cv2

from datetime import datetime
startTime = datetime.now()

from time import sleep

if len(sys.argv) != 2 and len(sys.argv) != 3:
    raise Exception("Invalid number of arguments! Include relative folder path as the only additional argument.")

thumbnails = False
if len(sys.argv) == 3:
    if sys.argv[2] != "--thumbnails":
        raise Exception("Invalid flag. Available flags: --thumbnails");
    else:
        thumbnails = True

# get folder path
folder = sys.argv[1]

#env vars
dotenv.load_dotenv('.env')
ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
SECRET_KEY = os.getenv("AWS_SECRET_KEY")
MONGO_USER = os.getenv("MONGO_USER_NAME")
MONGO_PASSWORD = os.getenv("MONGO_PASSWORD")
MONGO_CLUSTER = os.getenv("MONGO_CLUSTER_ID")

print(f"Connecting to AWS S3 Bucket:  {datetime.now() - startTime}")
# s3
s3 = boto3.client('s3',
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY,
)
bucket_name = 'tapeworms-unlocked.info'
print(f"Connected to AWS S3 Bucket:  {datetime.now() - startTime}")

print(f"Connecting to MongoDB:  {datetime.now() - startTime}")
# mongo
mongo = pymongo.MongoClient(f"mongodb+srv://{MONGO_USER}:{MONGO_PASSWORD}@{MONGO_CLUSTER}.mongodb.net")
db = mongo["csv_to_db_test"]
collection = db["test_2"]
print(f"Connected to MongoDB:  {datetime.now() - startTime}")

# get folder from cmd line args
folder_name = sys.argv[1]
folder_contents = sorted(os.listdir(folder_name), key=str.casefold)
folder_size = len(os.listdir(folder_name))

print("Updating MONGO and S3...")
# attempt to update mongo and s3
fail_count = 0
genus_images = []
for i in progressbar(range(folder_size), redirect_stdout=True):
    
    # add edge case (i == folder_size-1)
    next_file = folder_contents[i+1] if i < folder_size-1 else ""
    curr_file = folder_contents[i]
    
    # get genus name from filename
    curr_genus = curr_file.split('_')[0].lower()
    next_genus = next_file.split('_')[0].lower()
    
    # if current genus is same as next one, add current gen
    genus_images.append(curr_file)
    if curr_genus != next_genus:
        # update mongo
        string = "^" + curr_genus
        doc = collection.update
        try:
            if thumbnails == False:
                collection.update_one({"genus":{"$regex":string, "$options":"i"}},{"$set":{"images":genus_images}},upsert=False)
            else:
                collection.update_one({"genus":{"$regex":string, "$options":"i"}},{"$set":{"thumbnails":genus_images}},upsert=False)
        except:
            print(f"\u2717 Failed to update MONGO with {curr_genus} images...")
        
        # update s3
        for image in genus_images:
            try:
                image_path = f"{folder_name}/{image}"
                if thumbnails == False:
                    print("something")
                else:
                    # copy image to temp thumbnails folder
                    image_copy = cv2.imread(image_path).copy()
                    
                    # downscale preserving aspect ratio
                    new_width = 300
                    old_width = image_copy.shape[1]
                    scale = new_width / old_width
                    old_height = image_copy.shape[0]
                    new_height = int(old_height * scale)
                    
                    dim = (new_width, new_height)
                    
                    resized_image = cv2.resize(image_copy, dim, interpolation=cv2.INTER_AREA)
                    
                    # save image
                    if not os.path.isdir('../thumbnails'):
                        os.mkdir("../thumbnails")
                    
                    thumbnail_path = f"../thumbnails/{image}.png"
                    cv2.imwrite(thumbnail_path, resized_image)
                
                if thumbnails == False:
                    s3.upload_file(image_path, bucket_name, 'images/{}/{}'.format(curr_genus,image))
                else:
                    s3.upload_file(thumbnail_path, bucket_name, 'thumbnails/{}/{}'.format(curr_genus,image))
            except Exception as e:
                fail_count += 1
                print(f"\u2717 {image} failed to upload to S3...")
                print(e)
        
        # reset genus images
        genus_images = []
        
# print success status
print(f"Uploaded {folder_size - fail_count} of {folder_size}")
print("FINISHED: ", datetime.now() - startTime)