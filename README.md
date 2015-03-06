Zephyr
================

# About this project

Zephyr is a open-source project developed for the ESRI's ECCE App Challenge 2015 app challenge, developed by 3 University of Waterloo students. This project was inspired by [Cambecc's air](https://github.com/cambecc/air) project.

This application will plot out the sources of GHG's (green house gases), NOx (mono-nitrogen oxides), SOx (mono-sulfuric oxides), VOC (volatile organic compounds), NH3 (ammonia), and Hg (mercury) emissions throughout Canada.
The application will then simulate the coverage/spread of these emissions within Canada using a Global Wind Model, and plot them on the map.

Credits to Cambecc's [Earth Model](https://github.com/cambecc/earth) and ESRI's [Wind-JS](https://github.com/Esri/wind-js) from which much of the Wind Animations are based off. The emissions data is taken from Environment Canada's CESI (Canadian Environmental Sustainability Indicators) [Air and Climate Indicators](https://www.ec.gc.ca/indicateurs-indicators/default.asp?lang=En&n=03603FB3-1). The Wind Data itself is generated by a GFS (Global Forecast System), and is downloaded from [NOMADS](http://nomads.ncep.noaa.gov/) (the NOAA Operational Model Archive and Distribution System).

##About Us

| Graeme | Jaydeep | Sam |
|---|---|---|
|![megawac](http://i.imgur.com/Lpax8dO.jpg)|![Jaydeep](http://i.imgur.com/lwLMFfS.jpg)|![Sam](http://i.imgur.com/yKK9UOR.jpg)|

**Graeme** is a developer passionate about board games and bringing GIS functions to mobile robotics.
**Jaydeep** is an enthusiastic developer who is always willing to learn new gadgets and products!
**Sam** is a developer who is interested in turn-based strategy games, and in developing GIS applications to solve geo-spatial problems.

## Setup

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

![](https://lh3.googleusercontent.com/0CqJqDoXPoN-GC1_wBR77qVKohp0vGerSvYotN_dn3p2VSE-VaSnMGTgZpMQ4Du-gSmWvZ7W8ek=w1305-h539)
