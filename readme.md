There are two JSON files in this repository. One of the files (crime_data.json) is the raw crime data from the Vancouver police department - please read the disclaimer at the source below for the proper usage of this data. The second json file (collision.json) is a formatted version of the crime data for easier and more relevant usage. Details are below:

### collision_data

This data is formatted so that the [UTM is converted to lat/long](https://stackoverflow.com/questions/343865/how-to-convert-from-utm-to-latlng-in-python-or-javascript) for easy rendering on any map software. In addition to converting UTM to lat/long, the crime data is filtered to include only "Vehicle Collision or Pedestrian Struck" type of crime.

### crime_data.json

This data comes from the Vancouver Police Department. Please click on the source below and make sure you read the disclaimer before using the data!

#### source
https://data.vancouver.ca/datacatalogue/crime-data.htm

#### attributes
https://data.vancouver.ca/datacatalogue/crime-data-attributes.htm
