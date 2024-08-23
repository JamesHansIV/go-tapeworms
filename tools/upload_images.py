'''
    This script uploads images to the s3 images bucket, 
    then adds the links the files were added to to the correct mongo documents
    
    TODO: 
    * Add checks and flags for overwrite, duplicate handling in s3 bucket
    * Add flag for .env directory
    * Documentation on script usage
    * streamline flags implmentation (flag any order)
'''

import os
import sys
import dotenv
import progressbar
import boto3
import pymongo
import cv2
from enum import Enum
import certifi

from config_loader import load_config

from datetime import datetime
startTime = datetime.now()

from time import sleep

class Flags(Enum):
    NONE = 0,
    THUMBNAILS = 1,
    FEATURE_SELECTION_HINTS = 2

# if len(sys.argv) != 2 and len(sys.argv) != 3:
    # raise Exception("Invalid number of arguments! Invoke this command with: python3 upload_images.py [image directory relative path] [flag]")

# flag = Flags(Flags.NONE)
# if len(sys.argv) == 3:
#     # print(sys.argv[2])
#     if sys.argv[2] != "--thumbnails" and sys.argv[2] != "--feature_selection_hints":
#         # print(sys.argv[2])
#         raise Exception("Invalid flag. Available flags: --thumbnails, --feature_selection_hints")
#     if sys.argv[2] == "--thumbnails":
#         flag = Flags.THUMBNAILS
#     if sys.argv[2] == "--feature_selection_hints":
#         flag = Flags.FEATURE_SELECTION_HINTS

# print(flag)
# exit(0)

# get folder path
# folder = sys.argv[1]

#env vars
# dotenv.load_dotenv('.env')
# ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
# SECRET_KEY = os.getenv("AWS_SECRET_KEY")
# MONGO_USER = os.getenv("MONGO_USER_NAME")
# MONGO_PASSWORD = os.getenv("MONGO_PASSWORD")
# MONGO_CLUSTER = os.getenv("MONGO_CLUSTER_ID")

config_dict = load_config("config.yaml")
config_vars = config_dict["upload_images"]
credentials = config_dict["credentials"]

ACCESS_KEY = credentials["aws_access_key"]
SECRET_KEY = credentials["aws_secret_key"]
MONGO_USER = credentials["mongo_user_name"]
MONGO_PASSWORD = credentials["mongo_password"]
MONGO_CLUSTER = credentials["mongo_cluster_id"]

flag = Flags(Flags.NONE)
if config_vars["mode"] == "thumbnails":
    flag = Flags.THUMBNAILS
if config_vars["mode"] == "feature_selection_hints":
    flag = Flags.FEATURE_SELECTION_HINTS

print(f"Connecting to AWS S3 Bucket:  {datetime.now() - startTime}")
# s3
s3 = boto3.client('s3',
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY,
)
bucket_name = 'images.tapeworms-unlocked.info'
print(f"Connected to AWS S3 Bucket:  {datetime.now() - startTime}")

# mongo
print(f"Connecting to MongoDB:  {datetime.now() - startTime}")
try:
    # mongo = pymongo.MongoClient(f"mongodb+srv://{MONGO_USER}:{MONGO_PASSWORD}@{MONGO_CLUSTER}.mongodb.net")
    mongo = pymongo.MongoClient(f"mongodb+srv://{MONGO_USER}:{MONGO_PASSWORD}@{MONGO_CLUSTER}.mongodb.net", tlsCAFile=certifi.where())
    print("user",MONGO_USER)
    print("pass",MONGO_PASSWORD)
except Exception as e:
    print(f"Could not connect to MongoDB!\nError: {e}")
    exit()

# db = mongo["csv_to_db_test"]
db = mongo[config_vars["database"]]
collection = db[config_vars["collection"]] if flag == Flags.THUMBNAILS else db[config_vars["hint_collection"]]
print(collection)
print(f"Connected to MongoDB:  {datetime.now() - startTime}")

# get folder from cmd line args
folder_name = config_vars["images_directory_path"]
folder_contents = sorted(os.listdir(folder_name), key=str.casefold)
folder_size = len(os.listdir(folder_name))

print("Updating MONGO and S3...")
# attempt to update mongo and s3
fail_count = 0
s3_fail_count = 0
mongo_fail_count = 0
images = []
for i in progressbar.progressbar(range(folder_size), redirect_stdout=True):
    # exit(0)
    
    # add edge case (i == folder_size-1)
    next_file = folder_contents[i+1] if i < folder_size-1 else ""
    curr_file = folder_contents[i]
    
    # get genus name from filename
    if flag == Flags.NONE or flag == Flags.THUMBNAILS:
        curr_genus = curr_file.split('_')[0].lower()
        next_genus = next_file.split('_')[0].lower()
    
    # if current genus is same as next one, add current gen
    images.append(curr_file)
    if (flag == Flags.NONE or flag == Flags.THUMBNAILS) and curr_genus != next_genus:
        # update mongo
        string = "^" + curr_genus
        doc = collection.update
        try:
            if flag == Flags.NONE:
                collection.update_one({"genus":{"$regex":string, "$options":"i"}},{"$set":{"images":images}},upsert=False)
            elif flag == Flags.THUMBNAILS:
                collection.update_one({"genus":{"$regex":string, "$options":"i"}},{"$set":{"thumbnails":images}},upsert=False)
            # elif flag == Flags.FEATURE_SELECTION_HINTS:
            
        except Exception as e:
            mongo_fail_count += 1
            print(f"\u2717 Failed to update MONGO with {curr_genus} images...")
            print(f"ERROR: {e}")
        
        # update s3
        for image in images:
            try:
                image_path = f"{folder_name}/{image}"
                if flag == Flags.THUMBNAILS:
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
                
                if flag == Flags.NONE:
                    s3.upload_file(image_path, bucket_name, 'images/{}/{}'.format(curr_genus,image))
                if flag == Flags.THUMBNAILS:
                    s3.upload_file(thumbnail_path, bucket_name, 'thumbnails/{}/{}'.format(curr_genus,image))
            except Exception as e:
                s3_fail_count += 1
                print(f"\u2717 {image} failed to upload to S3...")
                # print(e)
        
        # reset genus images
        images = []
    
    if flag == Flags.FEATURE_SELECTION_HINTS:
        path = f"{folder_name}/{curr_file}"
        curr_file_words = curr_file.split("_")
        feature_words = [word for word in curr_file_words if word != "hint.png"]
        feature = " ".join(feature_words)
        # print(feature)
        try:
            print(collection)
            # collection.update_one({"feature":feature},{"$set":{"image_source":path}},upsert=False)
            # doc = collection.find_one({"feature":feature})
            # print(doc)
            collection.update_one({"feature":feature},{"$set":{"image_source":curr_file}}, upsert=True)
        except Exception as e:
            print(f"\u2717 Failed to update MONGO with \"{feature}\" image source \"{path}\"...")
            # print(f"ERROR: {e}")
            mongo_fail_count += 1
        try:
            s3.upload_file(path, bucket_name, 'hint_images/{}'.format(curr_file))
        except Exception as e:
            s3_fail_count += 1
            print(f"\u2717 {path} failed to upload to S3...")
            print(f"ERROR: {e}")

            
        
# print success status
print(f"Uploaded {folder_size - s3_fail_count} of {folder_size} to S3")
print(f"Updated {folder_size - mongo_fail_count} of {folder_size} in MongoDB")
print("FINISHED: ", datetime.now() - startTime)