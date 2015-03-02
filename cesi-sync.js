const path = require('path');
const request = require('request');
const csv = require('csv-parser');
var fs = require('fs');
var mkdirp = require('mkdirp');

var stringify = require('stringify-array-transform');

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
    return request(url)
      .pipe(csv({separator: '\t'}))
      .pipe(new stringify())
      .pipe(fs.createWriteStream(`./temp/${table}.json`));
});
