import pandas as pd
import numpy as np
import pymongo
import re
from multipledispatch import dispatch

from config_loader import load_config

pd.set_option('display.width', 700)
pd.set_option('display.max_columns', 6)

config_dict = load_config("config.yaml")
config_vars = config_dict["csv_to_color_map"]
credentials = config_dict["credentials"]

# create dataframe from csv
path = config_vars["csv_filepath"]
df = pd.DataFrame(pd.read_csv(path))

# strip bracketed (and parenthesis) phrases from feature titles
df = df.rename(columns=lambda x: re.sub(r"\[.*?\]|\(.*?\)", "", x))

# remove leading and trailing whitespace
df = df.rename(columns=lambda x: x.strip())

# reset index
df.reset_index(inplace=True,drop=True)

# df.to_csv("color_map.csv", sep=',', encoding='utf-8', index=False, header=True)
# exit(0)

# get env vars
# dotenv.load_dotenv('.env')
# user = os.getenv("MONGO_USER_NAME")
# pw = os.getenv("MONGO_PASSWORD")
# cluster_id = os.getenv("MONGO_CLUSTER_ID")
user = credentials["mongo_user_name"]
pw = credentials["mongo_password"]
cluster_id = credentials["mongo_cluster_id"]

# Connect to db
client = pymongo.MongoClient(f"mongodb+srv://{user}:{pw}@{cluster_id}.mongodb.net")

# create database
db = client[config_vars["database"]]

# create collection
collection = db[config_vars["collection"]]

# clear collection
print("CLEARING OLD COLLECTION")
collection.delete_many({})

seen_orders = set()

for i, row in df.iloc[:].iterrows():
    doc = {}
    
    if pd.isna(row["order"]):
        continue
    
    reg_res = re.search(r'\B[IVXLCDM]+',row["order"])
    if reg_res != None:
        row["order"] = row["order"][0:reg_res.span()[0]] + " " + row["order"][reg_res.span()[0]:]
    
    if row["order"] in seen_orders:
        continue
    
    doc["order"] = row["order"]
    doc["color"] = row["color"]
    
    # string = "INSERTING: {" + row["order"] + ": " + doc[row["order"]] + "}"
    # print("INSERTING: {" + f"{row["order"]}: {doc['color']}" + "}")
    # print(string)
    collection.insert_one(doc)
    seen_orders.add(row["order"])
    
print("DONE")
client.close()