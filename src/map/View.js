import L from 'leaflet';
import esri from 'esri-leaflet';
import Marionette from 'backbone.marionette';

var View = Marionette.ItemView.extend({
	template: false,
	id: 'map',

	onShow() {
		console.log("show me dammit");
		this.map = L.map(this.el).setView([37.75, -122.23], 1e3);
		esri.basemapLayer('Streets').addTo(this.map);
		navigator.geolocation.getCurrentPosition(pose => {
			console.log(pose);
			this.map.setView([pose.coords.latitude, pose.coords.longitude]);
		});
	}
});

export default View;