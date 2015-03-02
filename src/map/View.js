import L from 'leaflet';
require('leaflet-hash');
import esri from 'esri-leaflet';
import Marionette from 'backbone.marionette';

var View = Marionette.ItemView.extend({
	template: false,
	id: 'map',
	modelEvents: {
    	"update": "updateView"
  	},

	onShow() {
		global.map = this.map = L.map(this.el);
		this.baseLayer = esri.basemapLayer('Streets').addTo(this.map);
		this.updateView();
		L.hash(this.map);
	},

	updateView() {
		if (!location.hash) {
			this.map.setView(this.model.location, this.model.zoom);
		}
	}
});

export default View;