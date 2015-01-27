// Base layer class to be extended by other layers.
// A layer provides bindings between a data source and
// a map layer. A map layer of course can be a vector
// (point, line, polygon) or a raster. A layer can also
// have a grouping type - useful for the layer menu.

import L from 'leaflet';
import Backbone from 'backbone';
import _ from 'underscore';

export default class Layer extends Backbone.Model {
	constructor() {
		super();
		let LLayer = this.getLayer;
		this.layer = _.isFunction(LLayer) ? new LLayer(this.data) : LLayer;
		this.on('change', this.update);
	}

	update(model, update) {
		console.warn('update not implemented');
	}

	get data() {
		console.warn('get data not implemented');
	}
}