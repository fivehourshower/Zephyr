import L from 'leaflet';
import esri from 'esri-leaflet';
import Marionette from 'backbone.marionette';

var View = Marionette.ItemView.extend({
	template: false,
	id: 'map',

	onShow() {
		console.log("show me dammit");
		this.map = L.map(this.el).setView([37.75, -122.23], 10);
		esri.basemapLayer('Terrain').addTo(this.map);
	}
});

export default View;