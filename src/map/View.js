import Marionette from 'backbone.marionette';
import _ from 'lodash';

import L from 'leaflet';
import esri from 'esri-leaflet';
require('leaflet-hash');
require('leaflet-panel-layers/dist/leaflet-panel-layers.src');
require('../depends/Leaflet.D3SvgOverlay/L.D3SvgOverlay');

import popupTemplate from './popup.hbs';
import layers from './layers.json';

export default Marionette.ItemView.extend({
    template: false,
    id: 'map',
    modelEvents: {
        'update': 'updateView'
    },

    onShow() {
        global.map = this;
        this.map = L.map(this.el);
        this.updateView();
        L.hash(this.map);

        this.baseLayers = _.map(layers.baseLayers, (layer, index) => {
            return {
                // Put a space between words
                name: _.words(layer).join(' '),
                // Make a feature layer
                layer: esri.basemapLayer(layer),
                // Mark the first one active
                active: !index
            };
        });

        this.stationLayers = _.map(layers.stationLayers, (config, index) => {
            let layer = esri.featureLayer(config.url, {});

            // Register the popup template
            layer.bindPopup(feature => popupTemplate(feature.properties));

            return {
                group: 'station',
                name: config.name,
                layer: layer,
                active: !index
            };
        });

        //Make menuControl responsible for adding the layers to the map
        this.menuControl = new L.Control.PanelLayers(this.baseLayers, this.stationLayers);
        this.map.addControl( this.menuControl );
    },

    // Update the view from the model if the hash isn't set (indicating the requested pose)
    updateView() {
        if (!location.hash) {
            this.map.setView(this.model.location, this.model.zoom);
        }
    }
});
