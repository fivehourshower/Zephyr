Zephyr
================

# Setup

Install the following dependencies

- Install [io.js](https://iojs.org/en/index.html) (Tested on v1.3)
- Install the Thredds extension [`grib2json`](https://github.com/cambecc/grib2json) by **@cambecc** (requires Java and mvn) for converting the GFS data (grb) to JSON.
- `curl` is required for fetching the [GFS data](http://nomads.ncdc.noaa.gov/data.php?name=access#hires_weather_datasets.

After installing the dependencies via NPM start the server by running. T

```sh
# Install the deps
$ npm install
# Update CESI resources
$ npm run sync
# Start the dev server
$ npm run start
# Run the production? server
$ npm run server
```

This will update the data dependencies on ArcGIS Online by updating the poloution emitter tables with the tables from CESI ([example](http://maps-cartes.ec.gc.ca/indicators-indicateurs/TableView.aspx?ID=7)). After updating the data sources it will build the static files to serve and start the server. It will also rebuild the static resources if source files change.

##### Ubuntu setup

Run `ubuntu-setup.sh` for quick installation on Ubuntu.
