'use strict';

global.L_PREFER_CANVAS = true;
let L = global.L = require('leaflet');
//fix browserify causing leaflet to not know where images are.
L.Icon.Default.imagePath = './depends/leaflet/dist/images/';

module.exports = L;
