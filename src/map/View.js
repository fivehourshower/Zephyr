import L from 'leaflet';
import esri from 'esri-leaflet';
import Marionette from 'backbone.marionette';

var View = Marionette.ItemView.extend({
	template: false,
	id: 'map',
	modelEvents: {
    	"update": "updateView"
  	},

	onShow() {
		this.map = L.map(this.el);
		this.baseLayer = esri.basemapLayer('Streets').addTo(this.map);
		this.updateView();
	},

	updateView() {
		if (this.map) this.map.setView(this.model.location, this.model.zoom);
	}
});

export default View;