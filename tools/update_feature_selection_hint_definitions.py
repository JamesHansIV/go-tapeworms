import os
import sys
import dotenv
import progressbar
import pymongo
import csv
from enum import Enum

from config_loader import load_config
import certifi

from datetime import datetime
startTime = datetime.now()

from time import sleep

#env vars
# dotenv.load_dotenv('tools/.env')
# MONGO_USER = os.getenv("MONGO_USER_NAME")
# MONGO_PASSWORD = os.getenv("MONGO_PASSWORD")
# MONGO_CLUSTER = os.getenv("MONGO_CLUSTER_ID")

config_dict = load_config("config.yaml")
config_vars = config_dict["update_feature_selection_hint_definitions"]
credentials = config_dict["credentials"]

user = credentials["mongo_user_name"]
pw = credentials["mongo_password"]
cluster_id = credentials["mongo_cluster_id"]
print(config_vars)
# if len(sys.argv) != 2:
    # raise Exception("Invalid number of arguments! Include relative folder path as the only additional argument.")

# mongo
print(f"Connecting to MongoDB:  {datetime.now() - startTime}")
try:
    # mongo = pymongo.MongoClient(f"mongodb+srv://{MONGO_USER}:{MONGO_PASSWORD}@{MONGO_CLUSTER}.mongodb.net")
    mongo = pymongo.MongoClient(f"mongodb+srv://{user}:{pw}@{cluster_id}.mongodb.net", tlsCAFile=certifi.where())
    # print(user)
    # print(MONGO_PASSWORD)
except Exception as e:
    print(f"Could not connect to MongoDB!\nError: {e}")
    exit()

db = mongo[config_vars["database"]]
collection = db[config_vars["collection"]]
print(f"Connected to MongoDB:  {datetime.now() - startTime}")

# get definition file (.csv)
# definitions_csv = sys.argv[1]
definitions_csv = config_vars["definitions_csv_path"]

print("Updating MongoDB...")
mongo_fail_count = 0
row_count = 0
with open(definitions_csv, 'r', newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=',', quotechar='"')
    rows = list(reader)
    row_count = len(rows)
    for i in progressbar.progressbar(range(0, len(rows)), redirect_stdout=True):
        row = rows[i]
        feature, definition = row[0], row[1]
        try:
            collection.update_one({"feature":feature},{"$set":{"definition":definition}}, upsert=False)
        except Exception as e:
            print(f"\u2717 Failed to update MONGO with \"{feature}\" definition...")
            mongo_fail_count += 1
            
print(f"Updated {row_count - mongo_fail_count} of {row_count} in MongoDB")
print("FINISHED: ", datetime.now() - startTime)