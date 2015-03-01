var L = require('leaflet');
var Marionette = require('backbone.marionette');

var View = Marionette.ItemView.extend({
	initialize() {
		console.log("show me dammit");
	},

	onShow() {
		this.map = L.map(this.el);
	}
});

export default View;