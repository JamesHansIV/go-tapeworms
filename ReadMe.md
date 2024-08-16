# Tapeworms Unlocked
An open source multi-entry visual key to elasmobranch tapeworms.


## Update the Client, API, Images, and Data Scripts Found in the ```/tools``` Directory
To update anything related to the live Tapeworms Unlocked site, or your implementation of the framework, without manually writing code, simply use the scripts provided in the /tools directory of this repository.

Requirements:
* Python3
* All packages found in `/tools/requirements.txt` must be installed
* Access to the MongoDB cluster used to store your data
* Access to the AWS S3 bucket used to store your images
* A modified ```config.yaml``` file found in the ```/tools``` directory (originally named ```config_template.yaml```. Must be renamed to `config.yaml`)

### Installing Pip Packages from requirements.txt
To install all required packages from `requirements.txt` navigate in your terminal to the `/tools` directory and run `pip3 install -r requirements.txt`.

### Updating the application's data
The following process parses data from a .csv file and uploads the data as a collection of documents to a MongDB database.

Updating the application's data is straightforward. In `config.yaml` ensure all fields in the `credentials` and `csv_to_db` blocks are modified to your needs. Ensure you data.csv file follows the guidelines listed below before **include link** continuing to the next step.

While your current directory is `/tools`, run the following python script in your terminal: `csv_to_db.py`

Verify results in your MongoDB console. 

**NOTE:** The current implementation of `csv_to_db.py` requires `upload_images.py` (view instructions below) to be run after in order for images to be properly displayed on the webapp. This will be fixed in a later version.

### Updating Order Colors (ColorMap)
The following process updates the `colors` collection within MongoDB that contains documents with `order: color` pairs to be used in the styling of the webapp.

In `config.yaml` ensure all fields in the `credentials` and `csv_to_color_map` blocks are modified to your needs. Your .csv file should only have two columns: 'order' and 'color'.

While your current directory is `/tools`, run the following python script in your terminal: `csv_to_color_map.py`

Verify results in your MongoDB console.

### Uploading New Images
The following process uploads images to an AWS S3 bucket and updates MongoDB documents to include filenames of uploaded images. 

In `config.yaml` ensure all fields in the `credentials` and `upload_images` blocks are modified to your needs. If you want to upload images to be used by the grid cards used in the main page, set value of the `mode` field in the `upload_images` block to `"thumbnails"`. If you want to upload images to be used by the hint modals, set the value of the `mode` field in the `upload_images` block to `"feature_selection_hints"`.

While your current directory is `/tools`, run the following python script in your terminal: `upload_images.py`

Verify results in your AWS S3 console and your MongoDB console.

### Update the Client's Filter Component
Ensure all fields in the `credentials` and `build_filter` blocks are modified to your needs. Then using the `filter_template.yaml` file found in the `/tools` directory, modify the `filter_content` block found at the bottom of the file to suit your needs using the existing template blocks. 

When modifying `filter` template blocks, the value of the `feature_name` field must match the heading of its respective column in your data.csv file (used with `csv_to_db.py`) exactly. When modifying the `inputs` block of a `filter` block you should have a 'label' : 'value' pair for each possible value for that respective feature (ex: 'present', 'absent'). The 'label' key is the text that will be displayed within the filter UI to the user. The 'value' value is the value that is passed to the API for processing. The 'label' can be whatever you want. The 'value' must match a possible 'value' used in your data.csv file. Otherwise, the filter will not behave as expected.

While your current directory is `/tools`, run the following python script in your terminal: `build_filter.py`

Verify your results by rebuilding your webapp and testing its new filter using your browser's dev tools' network tab.