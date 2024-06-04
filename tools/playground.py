import os
import boto3
import pymongo
import dotenv

from datetime import datetime
startTime = datetime.now()


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
try:
    # mongo = pymongo.MongoClient(f"mongodb+srv://{MONGO_USER}:{MONGO_PASSWORD}@{MONGO_CLUSTER}.mongodb.net")
    mongo = pymongo.MongoClient(f"mongodb+srv://{MONGO_USER}:{MONGO_PASSWORD}@cluster1.of1bayg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1")
except Exception as e:
    print(f"Could not connect to MongoDB!\nError: {e}")
    exit()

db = mongo["csv_to_db_test"]
collection = db["feature_selection_modal_hints_v2"]
print(f"Connected to MongoDB:  {datetime.now() - startTime}")

# cursor = collection.find({})
# for doc in cursor:
#     print(doc)
# print(cursor)
# print(cursor[0])
try:
    c = collection.find_one({})
except Exception as e:
    print(f"FAILED: {e}")