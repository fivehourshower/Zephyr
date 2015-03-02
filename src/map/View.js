import L from 'leaflet';
require('leaflet-hash');
require('leaflet-panel-layers/dist/leaflet-panel-layers.src');

import esri from 'esri-leaflet';
import Marionette from 'backbone.marionette';
import _ from 'lodash';

var View = Marionette.ItemView.extend({
    template: false,
    id: 'map',
    modelEvents: {
        "update": "updateView"
    },

    baseLayers: ['Streets', 'Topographic', 'NationalGeographic', 'Oceans', 'ImageryLabels'],

    onShow() {
        global.map = this;
        this.map = L.map(this.el);
        this.updateView();
        L.hash(this.map);


        this.baseLayers = _.map(this.baseLayers, (layer, index) => {
            return {
                // Put a space between words
                name: layer.split(/(?=[A-Z][^A-Z])/).join(" "),
                // Make a feature layer
                layer: esri.basemapLayer(layer),
                // Mark the first one active
                active: !index
            };
        });
        this.menuControl = new L.Control.PanelLayers(this.baseLayers, null, {collapsed: false});
        this.map.addControl( this.menuControl );
    },

    updateView() {
        if (!location.hash) {
            this.map.setView(this.model.location, this.model.zoom);
        }
    }
});

export default View;
