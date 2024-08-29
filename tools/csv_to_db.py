import pandas as pd
import pymongo
import re
from multipledispatch import dispatch
import os
import dotenv
from config_loader import load_config
import certifi

pd.set_option('display.width', 700)
pd.set_option('display.max_columns', 6)


@dispatch(str)
def toBool(x):
    if x.lower() == "true": x = True
    elif x.lower() == "false": x = False
    else: return "ERROR"
    
    return x

@dispatch(list)
def toBool(x):
    y = []
    for v in x:
        if v.lower() == "true": 
            y.append(True)
        elif v.lower() == "false": 
            y.append(False)
        else: return "ERROR"
    return y

config_dict = load_config("config.yaml")
config_vars = config_dict["csv_to_db"]
credentials = config_dict["credentials"]

# create dataframe from csv
path = config_vars["csv_filepath"]
df = pd.DataFrame(pd.read_csv(path))

# clean up dataframe
# drop empty rows with all nans
df.dropna(how="all", inplace=True)

# drop color and x columns (unnamed and "Feature" columns)

df = df.loc[:, ~df.columns.str.contains('Unnamed')]
# df.drop("Feature", axis=1, inplace=True)


# drop helper rows (used later)
df.drop([0,1], inplace=True)

# strip bracketed (and parenthesis) phrases from feature titles
df = df.rename(columns=lambda x: re.sub(r"\[.*?\]|\(.*?\)", "", x))

# remove leading and trailing whitespace
df = df.rename(columns=lambda x: x.strip())

# reset index
df.reset_index(inplace=True,drop=True)

# df.to_csv("test.csv", sep='\t', encoding='utf-8', index=False, header=True)
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
client = pymongo.MongoClient(f"mongodb+srv://{user}:{pw}@{cluster_id}.mongodb.net", tlsCAFile=certifi.where())

# create database
db = client[config_vars["database"]]

# create collection
collection = db[config_vars["collection"]]

# clear collection
print("CLEARING OLD COLLECTION")
collection.delete_many({})

# create doc
for i, genus in df.iloc[:].iterrows():
    doc = {}
    for feature in df:
        if pd.isna(genus[feature]):
            continue
        
        # print(feature,'\n')
        
        # fix spacing of genus or order names with roman numerals
        if feature == "order":
        # or feature == "genus": # uncomment if roman numerals in genus, although this can lead to errors 
        # if the genera name is capitalized (regex will recognize capital I, V, X, L, C, D, M as roman 
        # numerals and split the string accordingly)
            # regex
            reg_res = re.search(r'\B[IVXLCDM]+',genus[feature])
            if reg_res != None:
                genus[feature] = genus[feature][0:reg_res.span()[0]] + " " + genus[feature][reg_res.span()[0]:]
            
        # used for bools (normal_text)    
        if genus[feature] == True or genus[feature] == False:
            doc[feature] = genus[feature]
            # doc[feature] = toBool(doc[feature])
            continue
        
        
        if genus[feature].find("/") != -1:
            doc[feature] = genus[feature].split("/")
            # print(doc[feature])

        else:
            doc[feature] = genus[feature]
            # doc[feature] = toBool(doc[feature])
        
        
        if doc[feature] == "TRUE" or doc[feature] == "FALSE":
            doc[feature] = toBool(doc[feature])
            
    print(f"INSERTING: {doc['order']} {doc['genus']}")
    collection.insert_one(doc)


print("DONE")

client.close()
