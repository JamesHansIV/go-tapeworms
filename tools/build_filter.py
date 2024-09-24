
from progressbar import progressbar
import yaml
import textwrap
from enum import Enum
import re

from config_loader import load_config

from datetime import datetime
startTime = datetime.now()

from time import sleep

class COMPONENT_TYPE(Enum):
    HEADING = 0,
    ACCORDION = 1,
    FILTER = 2,
    # SUGGESTION_BOX = 3


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
    

def build_import_strings():
    str = textwrap.dedent("""
        import React, {useEffect, useState, useRef} from 'react';
        import styles from './filter.module.css';
        import Accordion from './accordion';
        import RadioPillSelector from './radio-pill-selector';
        import ChecklistPillSelector from './checklist-pill-selector';
        import DetailedFeatureSelection from './detailed-feature-selection';
        import ScrollToTopButton from './scroll-to-top-button';
        import { SuggestionTextBox } from './suggestion-text-box';
        """)   
    
    return str


# build initial stuff (including first header)
# iterate through each component found in contnet and add
# add closures

def build_imports_and_headers():
    str = textwrap.dedent(f"""\
        import React, {{useEffect, useState, useRef }} from 'react';

        import styles from './filter.module.css';
        import Accordion from './accordion';
        import RadioPillSelector from './radio-pill-selector';
        import ChecklistPillSelector from './checklist-pill-selector';
        import DetailedFeatureSelection from './detailed-feature-selection';
        import ScrollToTopButton from './scroll-to-top-button';
        import {{ SuggestionTextBox }} from './suggestion-text-box';
        """)
    return str

def build_functional_component(components, content):
    str = "function Filter (props) {\n"
        
    str += textwrap.dedent(f"""\
        const scrollTargetRef = useRef();

        const [getMeCloseVisible, setGetMeCloseVisible] = useState(true);
        const [topModalZ, setTopModalZ] = useState(99999);\n
        """)
    
    str += build_filter_states(components) + "\n"
    str += build_helper_functions(components) + "\n\n"
    str += build_jsx_return_statement(components,content)
        
    str += "}\n\nexport default Filter;"
    return str

def init_state(filter):
    # print(component,"\n")
    value = filter['feature_name']
    set_value = "set" + value[0].upper() + value[1:]
    if filter['filter_type'] == 'checklist_pill_selector':
        return f"const [{value}, {set_value}] = useState([]);\n"
    else:
        return f"const [{value}, {set_value}] = useState(null);\n"

def init_suggestion_box_data_state(filter):
    value = filter['feature_name']  + 'Data'
    set_value = 'set' + value[0].upper() + value[1:]
    return f"const [{value}, {set_value}] = useState([]);\n"

def build_query_key_value_pair(filter):
    # print(filter)
    value = filter['feature_name']
    param = re.sub(r'(?<!^)(?=[A-Z])', '_', filter['feature_name']).lower()
    return f"'{param}' : {value}"

def build_clear_query_function_call(filter, isArray):
    # print(filter,"\n")
    feature_name = filter['feature_name']
    # print(feature_name, filter['filter_type'], filter['filter_type'] == 'checklist_pill_selector', isArray)
    return "set" + feature_name[0].upper() + feature_name[1:] + ("(null)" if not isArray else "([])")

def build_suggestion_box_fetch_data_function(filter):
    function_name = f"get{filter['feature_name'][0].upper()}{filter['feature_name'][1:]}Data"
    endpoint = filter['api_endpoint']
    data_key = filter['target_data_key']
    set_state_func = f"set{filter['feature_name'][0].upper()}{filter['feature_name'][1:]}"
    string = f"\nconst {function_name} = async() => " + '{'
    string += f"\nconst response = await fetch(`{endpoint}`);"
    string += "\nconst data = await response.json()\nlet arr  = []\nfor(let d of data){\narr.push("
    string += f"d.{data_key})\n" + "}" + f"\n{set_state_func}Data(arr)" + "\n}\n"
    return string

def build_filter_states(components):
    string = ""
    for i in range(1, len(components)):
        if components[i] == COMPONENT_TYPE.ACCORDION:
            for filter in content[i]['accordion']['filters']:
                filter = filter['filter']
                string += init_state(filter)
        elif components[i] == COMPONENT_TYPE.FILTER:
            filter = content[i]['filter']
            string += init_state(filter) 
        else:
            continue   
    return string

def build_helper_functions(components):
    # suggestion box data states
    string = ""
    for i in range(1, len(components)):
        if components[i] == COMPONENT_TYPE.ACCORDION:
            for filter in content[i]['accordion']['filters']:
                filter = filter['filter']
                if filter['filter_type'] == 'suggestion_box':
                    string += init_suggestion_box_data_state(filter)
        elif components[i] == COMPONENT_TYPE.FILTER:
            filter = content[i]['filter']
            if filter['filter_type'] == 'suggestion_box':
                string += init_suggestion_box_data_state(filter)
        else:
            continue
        
    # suggestionb box data fetchers
    for i in range(1, len(components)):
        if components[i] == COMPONENT_TYPE.ACCORDION:
            for filter in content[i]['accordion']['filters']:
                filter = filter['filter']
                if filter['filter_type'] == 'suggestion_box':
                    string += build_suggestion_box_fetch_data_function(filter)
        elif components[i] == COMPONENT_TYPE.FILTER:
            filter = content[i]['filter']
            if filter['filter_type'] == 'suggestion_box':
                string += build_suggestion_box_fetch_data_function(filter)
        else:
            continue
    
    # build query
    string += "\n\nconst buildQuery = () => {\nlet query = {\n"
    for i in range(1, len(components)):
        if components[i] == COMPONENT_TYPE.ACCORDION:
            for filter in content[i]['accordion']['filters']:
                filter = filter['filter']
                string += "" + build_query_key_value_pair(filter) + ",\n"
        elif components[i] == COMPONENT_TYPE.FILTER:
            filter = content[i]['filter']
            string += "" + build_query_key_value_pair(filter) + ",\n"         
        else:
            continue   
    string += "};\n"
    string += "\nfor (let p in query) {\nif (query[p] === null || query[p].length === 0)\ndelete query[p];\n}"
    string += "\nlet params = new URLSearchParams(query);\nprops.setFilters(params.toString());\n}"
    
    # scroll to top
    string += "\n\nconst scrollToTop = () => scrollTargetRef.current.scrollIntoView({behavior: 'smooth',block:'start'});\n"
    
    # clear filters
    string += "const clearFilters = () => {\n"
    for i in range(1, len(components)):
        if components[i] == COMPONENT_TYPE.ACCORDION:
            for filter in content[i]['accordion']['filters']:
                filter = filter['filter']
                string += build_clear_query_function_call(filter, filter['filter_type'] == 'checklist_pill_selector') + ";\n"
        elif components[i] == COMPONENT_TYPE.FILTER:
            filter = content[i]['filter']
            string += build_clear_query_function_call(filter, filter['filter_type'] == 'checklist_pill_selector') + ";\n"
        else:
            continue
    string += "}\n"
    
    string += "\n// ON RENDER\nbuildQuery();\n"
    
    
    string += build_use_effect_function(components)
    
    return string

def build_use_effect_function(components):
    
    string = "useEffect(() => {\n"
    for i in range(1, len(components)):
        if components[i] == COMPONENT_TYPE.ACCORDION:
            for filter in content[i]['accordion']['filters']:
                filter = filter['filter']
                if filter['filter_type'] == 'suggestion_box':
                    string += f"get{filter['feature_name'][0].upper()}{filter['feature_name'][1:]}Data();\n"
        elif components[i] == COMPONENT_TYPE.FILTER:
            filter = content[i]['filter']
            if filter['filter_type'] == 'suggestion_box':
                string += f"get{filter['feature_name'][0].upper()}{filter['feature_name'][1:]}Data();\n"
        else:
            continue
    string += "},[]);\n"
    
    return string

def build_jsx_return_statement(components, filter_content):
    string = textwrap.dedent(f"""\
        return(
        <div className={{styles.container}} id={{"filtercontainer"}}>
        <div className={{styles.scrollableWrapper}}>
        <span className={{styles.icons}}>
        <ScrollToTopButton onClick={{scrollToTop}}/>
        </span>
        <span ref={{scrollTargetRef}}>
        <span className={{styles.headingButtonContainter}}> 
        <h2>{filter_content[0]["heading"]}</h2>
        <button className={{styles.clearFiltersButton}} onClick={{clearFilters}}>Clear Filters</button>
        </span>
        </span>
        """)
    string += build_jsx_content(components, filter_content) + "\n<div style={{height:'225px'}}/>\n</div>\n</div>\n);\n"
    # string += "\n\n\n\n</div>\n</div>\n"
    # print("test")
    # string += "asjdkfl;ajsdklfjas;djf"
    return string

def build_jsx_content(components, content):
    # handle accordion
    # handle radio
    # handle check
    # handle suggestions
    # handle new headers
    string = ""
    for i in range(1, len(components)):
        if components[i] == COMPONENT_TYPE.HEADING:
            component = content[i]['heading']
            string += f"\n\n<br/><h2 className={{styles.subtitle}}>{component}</h2>\n"
        elif components[i] == COMPONENT_TYPE.ACCORDION:
            component = content[i]['accordion']
            has_divider = " divider" if component['divider'] == True else ""
            string += f"<Accordion header={{'{component['header']}'}} openInitially={{{str(component['open_initally']).lower()}}}{has_divider}>\n"
            for filter in component['filters']:
                string += (build_filter_component_jsx(filter["filter"]))
            string += "</Accordion>"
        elif components[i] == COMPONENT_TYPE.FILTER:
            filter = content[i]['filter']
            if filter['filter_type'] == 'radio_pill_selector':
                string += build_radio_pill_selector_jsx(filter)
            elif filter['filter_type'] == 'checklist_pill_selector':
                string += build_checklist_pill_selector_jsx(filter)
            elif filter['filter_type'] == 'suggestion_box':
                string += build_suggestion_box_jsx(filter)
            else:
                print("\nUNRECOGNIZED filter_type in yaml!\n\n")
                exit(0)
        # print(component)
    
    return string

def build_accordion_jsx(filter):
    return

def build_filter_component_jsx(filter):
    jsx = ""
    if (filter['filter_type'] == 'radio_pill_selector'):
        jsx = build_radio_pill_selector_jsx(filter)
        # print(jsx)
    if (filter['filter_type'] == 'checklist_pill_selector'):
        jsx = build_checklist_pill_selector_jsx(filter)
    if (filter['filter_type'] == 'suggestion_box'):
        jsx =build_suggestion_box_jsx(filter)
             
    return jsx

def build_radio_pill_selector_jsx(filter):    
    # add check for modal for wrapper div
    # find and replace  with  for n_indents
    jsx = ""
    
    heading_jsx = ""
    if ('heading' in filter):
        heading_jsx = "<h5 className={styles.moreFeaturesHeader}>" + filter['heading'] + "</h5>\n"
    
    has_hint_modal = filter['hint_modal']
    if (has_hint_modal):
        jsx += "<div style={{display:'flex', height:'100%'}}>\n"
    
    input_dict = "{{"
    for i, pair in enumerate(filter['inputs']):
        # add checks for value type
        label, value = list(pair.keys())[0], list(pair.values())[0]
        input_dict += f"'{label}':'{value}'" if i == 0 else f", '{label}':'{value}'"
    input_dict += "}}" # closure
    value = filter['feature_name']
    set_value = "set" + filter['feature_name'][0].upper() + filter['feature_name'][1:]
        
    jsx += f"<RadioPillSelector\ninputDict={input_dict}\nvalue={{{value}}}\nsetValue={{{set_value}}}\n"
    
    if 'abbreviation' in filter:
        abbr_block = filter['abbreviation']
        if 'abbreviated_phrase' not in abbr_block or 'unabbreviated_phrase' not in abbr_block:
            print("ERROR: Missing 'abbreviated_phrase' or 'unabbreviated_phrase' not in abbreviation block! Terminating script...")
            exit(1)
        abbr = abbr_block['abbreviated_phrase']
        un_abbr = abbr_block['unabbreviated_phrase']
        
        jsx += "abbreviation={{" + f"'{abbr}' : '{un_abbr}'" + "}}\n"
    
    modal_height = filter['modal_height'] if 'modal_height' in filter else 'tall'
    
    if (has_hint_modal):
        jsx += "\n/>\n" + build_detailed_feature_selection_jsx(input_dict, value, set_value, modal_height) + "\n</div>\n"
    
    return heading_jsx + jsx

def build_checklist_pill_selector_jsx(filter):
    heading_jsx = ""
    if ('heading' in filter):
        heading_jsx = "<h5 className={styles.moreFeaturesHeader}>" + filter['heading'] + "</h5>\n"
    
    jsx = ""
    has_hint_modal = filter['hint_modal']
    # if (has_hint_modal):
    #     jsx += "<div style={{display:'flex', height:'100%'}}>\n"
    
    input_dict = "{{"    
    for i, pair in enumerate(filter['inputs']):
        # add checks for value type
        label, value = list(pair.keys())[0], list(pair.values())[0]
        input_dict += f"'{label}':'{value}'" if i == 0 else f", '{label}':'{value}'"
    input_dict += "}}" # closure
    
    value = filter['feature_name']
    set_value = "set" + filter['feature_name'][0].upper() + filter['feature_name'][1:]
    
    jsx += f"<ChecklistPillSelector\ninputDict={input_dict}\nvalue={{{value}}}\nsetValue={{{set_value}}}\n"
    
    if (has_hint_modal):
        modal_height = filter['modal_height'] if 'modal_height' in filter else 'tall'
        # jsx += "\n" + build_detailed_feature_selection_jsx(input_dict, value, set_value) + "\n</div>\n"
        jsx += f"hasHints={{true}}\nhintPanelType={{'{modal_height}'}}\nfeatureName={{'{value}'}}\ntopModalZ={{topModalZ}}\nsetTopModalZ={{setTopModalZ}}\nbrowser={{props.browser}}\n"
        
    jsx += "/>\n"
    
    return heading_jsx + jsx

def build_suggestion_box_jsx(filter):
    heading_jsx = ""
    if ('heading' in filter):
        heading_jsx = "<h5 className={styles.moreFeaturesHeader}>" + filter['heading'] + "</h5>\n"
    value = filter['feature_name']
    set_value = "set" + filter['feature_name'][0].upper() + filter['feature_name'][1:]
    options = filter['feature_name'] + "Data"
    
    return heading_jsx + f"<SuggestionTextBox\noptions={{{options}}}\nvalue={{{value}}}\nsetValue={{{set_value}}}\n/>"

def build_detailed_feature_selection_jsx(input_dict, value, set_value, modal_height):
    jsx = f"<DetailedFeatureSelection\ninputDict={input_dict}\nvalue={{{value}}}\nsetValue={{{set_value}}}\nfeatureName={{'{value}'}}\nhintPanelType={{'{modal_height}'}}\ntopModalZ={{topModalZ}}\nsetTopModalZ={{setTopModalZ}}\nbrowser={{props.browser}}\n/>"
    return jsx

class TOKEN(Enum):
    DIV = 0,
    SPAN = 1,
    BR = 2,
    H2 = 3,
    H5 = 4,
    ACCORDION = 5,
    RADIO_PILL_SELECTOR = 6,
    CHECKLIST_PILL_SELECTOR = 7,
    SCROLL_TO_TOP_BUTTON = 8
    

# Add function to fix indentation
def tokenize_jsx_string(jsx_string):  
    # print(jsx_string)
    tokens = []
    l, r = 0, 1 # < is begining, > is end of token, all tokens between this and closure are children
    while l <= r and r < len(jsx_string):           
        if jsx_string[l] == '<':
            if jsx_string[r] == ' ':
                # tokens.append("<" + jsx_string[l+1:r] + ">")
                tag = jsx_string[l+1:r]
                # print(tag)
                # print("TOKENS 0: ", tokens)
                while r < len(jsx_string) and jsx_string[r] != '>':
                    r += 1
                l = r
            else:
                r += 1
            
        if jsx_string[r] == '>':
            if (jsx_string[l+1:r] != ""):
                tag = jsx_string[l+1:r]
                # print(tag)
                # tokens.append("<" + jsx_string[l+1:r] + ">")
            # print("TOKENS 1: ", tokens)
            l = r
            r += 1
        
        if jsx_string[l] == '>':
            if r == len(jsx_string):
                break
            if  jsx_string[r] == '<' and jsx_string[l + 1:r] != "":
                tag = jsx_string[l+1:r]
                # print(tag)
                # tokens.append(jsx_string[l+1:r])
                # print("TOKENS 2: ", tokens)
                l = r
            r += 1
    
    tokens = [token for token in tokens if token]
    return tokens
        
def tokens_to_tree(tokens):
    tree = []
    l, r = 0, len(tokens) - 1
    
    tags = ['<div>', '</div>', '<span>', '</span>', '<b>', '</b>', '<u>', '</u>']
    while l <= r:
        # print(tokens[l], tokens[r][0] + tokens[r][2:])
        if tokens[l] == tokens[r][0] + tokens[r][2:]:
            if (len(tree) > 0):
                tree[-1].append([tokens[l]])
            else:
                tree.append([tokens[l]])
            l += 1
            r -= 1
        elif tokens[l] not in tags:
            tree[-1].append([tokens[l]])
            l += 1
        elif tokens[r] not in tags:
            tree[-1].append([tokens[r]])
            r -= 1
        
    
    
    return tree

def indent(jsx_string):
    res = ""
    jsx_string = "<div><b>test</b><u>word</u></div>"
    # jsx_string = "<div myprop='test'><b>test</b></div><span><span>some words</span></span>"
    # tokenize each component into parent and child
    # recursively indent based off of indent level
    # will need to tokenize props
    
    tokens = tokenize_jsx_string(jsx_string)
    # tree = tokens_to_tree(tokens)
    
    # print(tokens)
    # print(tree)
    
    return res


config_vars = load_config("config.yaml")["build_filter"]

content = load_filter_content(config_vars["filter_yaml_filepath"])
components = get_filter_component_types(content)

functional_component = build_functional_component(components, content)
imports = build_imports_and_headers()
# states = build_filter_states(components)
# return_statement = build_jsx_return_statement(components,content)

# out = imports + "\n\n" + states + "\n\n" + return_statement
# indented = indent(states + res)

out = imports + "\n\n" + functional_component

# res = indent(build_jsx_return_statement(components, content))

# with open("result.js", "w") as file:
output_path = "filter.js" if "output_directory" not in config_vars else f"{config_vars['output_directory']}/filter.js"

with open(output_path, "w") as file:
    file.write(out)

exit(0)

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

imports = api_build_imports_and_headers()
filter_route = api_build_filter_route(components, content)
# suggestion_box_data_route = api_build_suggestion_box_data_route(components)
# colors_route = api_build_colors_route(content)
# modal_hints = api_build_modal_hints_route(components, content)

api_out = imports + "\n\n" + filter_route + "\n\nmodule.exports = routes;"
# with open("api.js", "w") as file:
    # file.write(api_out)