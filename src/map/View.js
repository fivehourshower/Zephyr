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
		global.map = this.map = L.map(this.el);
		this.baseLayer = esri.basemapLayer('Streets').addTo(this.map);
		this.updateView();
		this.map
			.on('dragend', this.updateHash, this)
			.on('zoomend', this.updateHash, this);
	},

	updateView() {
		if (this.map) this.map.setView(this.model.location, this.model.zoom);
	},
	updateHash() {
		let {lng, lat} = this.map.getCenter();
		this.model.update([lat, lng, this.map.getZoom()]);
	}
});

export default View;