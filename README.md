Zephyr
================

After installing the dependencies via NPM start the server by running

```sh
$ npm run start
```

This will update the data dependencies on ArcGIS Online by updating the poloution emitter tables with the tables from CESI ([example](http://maps-cartes.ec.gc.ca/indicators-indicateurs/TableView.aspx?ID=7)). After updating the data sources it will build the static files to serve and start the server. It will also rebuild the static resources if source files change.