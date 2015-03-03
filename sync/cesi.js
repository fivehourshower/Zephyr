import path from 'path';
import request from 'request';
import csv from 'csv-parser';
import fs from 'fs';
import mkdirp from 'mkdirp';
import _ from 'lodash';
import through from 'through2';
import toArray from 'stream-to-array';

const tables = [
    1,  // GHG
    5,  // NOx
    6,  // SOx
    7,  // VOC
    9,  // NH3
    11, // Hg
];

mkdirp.sync('temp');

tables.forEach(table => {
    let url = `http://maps-cartes.ec.gc.ca/CESI_Services/DataService/${table}/en`;
    console.log('Downloading', url);
    let stream = request(url)
      .pipe(csv({separator: '\t'}))
      .pipe(through.obj(function(row, enc, cb) {
        this.push({
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [+row.Longitude, +row.Latitude]
            },
            properties: _.omit(row, 'Latitude', 'Longitude')
        });
        cb();
      }))

    // Pipe the stream to an array, format as geojson (wgs84) and pipe to fie
    toArray(stream, (err, arr) => {
        let json = JSON.stringify({
           'type': 'FeatureCollection',
           'features': arr
        }, null, 2);
        let file = `./temp/${table}.json`;
        fs.writeFile(file, json, () => console.log('writing', file));
    });
});
