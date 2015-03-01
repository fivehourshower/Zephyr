var _ = require('lodash');
var Download = require('download');

var tables = [
	1,  // GHG
	5,  // NOx
	6,  // SOx
	7,  // VOC
	9,  // NH3
	11, // Hg
];

var dl = new Download().dest("./temp");

_.each(tables, table => {
	var url = `http://maps-cartes.ec.gc.ca/CESI_Services/DataService/${table}/en`;
	console.log('Downloading', url);
	dl.get(url, `temp/${table}`);
});

dl.run((err, files) => {
	console.log(files);
});