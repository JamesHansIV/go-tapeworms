from config_loader import load_config
import yaml
import textwrap
from enum import Enum

class COMPONENT_TYPE(Enum):
    HEADING = 0,
    ACCORDION = 1,
    FILTER = 2,

def load_filter_content(filepath):
    with open (filepath,"r") as file:
        filter_template = yaml.safe_load(file)
        
        #filepaths
        # mongo
        # aws
        # endpoints
        
        # filter content
        content = filter_template["filter_content"]
        return content
    
def get_filter_component_types(content):
    arr = []
    for component in content:
        arr.append(list(component.keys())[0])

    components = []

    for x in arr:
        if x == 'heading':
            components.append(COMPONENT_TYPE.HEADING)
        if x == 'accordion':
            components.append(COMPONENT_TYPE.ACCORDION)
        if x == 'filter':
            components.append(COMPONENT_TYPE.FILTER)

    # print(arr)
    return components

# API
def api_build_imports_and_headers():
    string = textwrap.dedent("""
        const express = require("express");
        const sanitize = require("mongo-sanitize");
        const routes = express.Router({mergeParams: true});
        const dbo = require("./connect");

        const https = require('https');
        const { features } = require("process");

        // wakeup
        setInterval(()=> {
            // console.log("Pinging API")
            https.get("https://api.tapeworms-unlocked.info");

        }, 13 * 60 * 1000);

        // redireect /
        routes.route("/").get(async function (req, res) {
            res.redirect("/worms");
        });
        
        routes.route("/colors").get(async function(req, res) {
            const connection = dbo.getDb();
            
            connection
            .collection("order_colors")
            .find({})
            .toArray(function (err, result) {
                if (err) throw err;
                else res.json(result);
            });
        });
    """)
    return string

def api_build_query_params_set(components):
    string = ""
    for i in range(1, len(components)):
        if components[i] == COMPONENT_TYPE.ACCORDION:
            for filter in content[i]['accordion']['filters']:
                filter = filter['filter']
                string += filter['feature_name'] + ",\n"
        elif components[i] == COMPONENT_TYPE.FILTER:
            filter = content[i]['filter']
            string += filter['feature_name'] + ",\n"
        else:
            continue 
    string += "\ncount_by_order\n} = req.query;\n\n"  
    return string

def api_build_query_param(filter):
    string = ""
    param = filter['feature_name']
    if filter['filter_type'] == "radio_pill_selector" or filter['filter_type'] == "suggestion_box":
        string += f'if ({param} != null)' + '{' + f'\nsanitize({param});\nquery["$and"].push({{"{param}": {param}}});\n'
    elif filter['filter_type'] == "checklist_pill_selector":
        string += f'if ({param} != null)' + '{' + f'\nsanitize({param});\nfeatureArray = {param}.split(",");\nfor (i in featureArray) {{\nquery["$and"].push({{"{param}": featureArray[i]}});\n}}'
    string += "}\n\n"
    return string

def api_build_query_params_handling(components):
    string = ""
    for i in range(1, len(components)):
        if components[i] == COMPONENT_TYPE.ACCORDION:
            for filter in content[i]['accordion']['filters']:
                filter = filter['filter']
                string += api_build_query_param(filter)
        elif components[i] == COMPONENT_TYPE.FILTER:
            filter = content[i]['filter']
            string += api_build_query_param(filter)
        else:
            continue 
    return string

def api_build_filter_route(components, content):
    # worms needs to be replaced
    string = "routes.route('/worms/').get(async function(req, res) {\nconst connection = dbo.getDb();\n\nlet query = {}\nquery['$and'] = [];\n\nlet collection = process.env.COLLECTION;\n\nlet {\n"
    string += api_build_query_params_set(components)
    string += "const page = parseInt(req.query.page);\nconst limit = parseInt(req.query.limit);\n\n"
    string += api_build_query_params_handling(components)
    string += "const startIndex = (page - 1) * limit;\n\nif (count_by_order === true) {\nconnection\n.collection(collection)\n.find(query.$and.length == 0 ? {} : query)\n.toArray ( function (err, result) {\nif (err) throw err;\nelse res.json(result);\n});\n"
    string += "} else {\nconnection\n.collection(collection)\n.find(query.$and.length == 0 ? {} : query)\n.skip(startIndex)\n.limit(limit)\n.toArray ( function (err, result) {\nif (err) throw err;\nelse res.json(result);\n});\n}\n});\n\n"
    
    return string

config_vars = load_config("config.yaml")["build_api"]

content = load_filter_content(config_vars["filter_yaml_filepath"])
components = get_filter_component_types(content)

imports = api_build_imports_and_headers()
filter_route = api_build_filter_route(components, content)
# suggestion_box_data_route = api_build_suggestion_box_data_route(components)
# colors_route = api_build_colors_route(content)
# modal_hints = api_build_modal_hints_route(components, content)
output_path = "api.js" if "output_directory" not in config_vars else f"{config_vars['output_directory']}/api.js"
api_out = imports + "\n\n" + filter_route + "\n\nmodule.exports = routes;"
with open(output_path, "w") as file:
    file.write(api_out)