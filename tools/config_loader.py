import sys
import os
import yaml

def load_config(filepath):
    with open(filepath,"r") as file:
        res = yaml.safe_load(file)
        return res