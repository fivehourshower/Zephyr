import Marionette from 'backbone.marionette';
import _ from 'lodash';
import $ from 'jquery';

import L from 'leaflet';
import esri from 'esri-leaflet';
require('leaflet-hash');
require('leaflet-panel-layers/dist/leaflet-panel-layers.src');
require('esri-leaflet-clustered-feature-layer');
require('leaflet.markercluster');
require('Leaflet.vector-markers/dist/Leaflet.vector-markers.js');

import popupTemplate from './popup.hbs';
import layers from './layers.json';
import WindyLayer from './wind/WindyLayer';

export default Marionette.ItemView.extend({
    template: false,
    id: 'map',
    events: {
        'change :checkbox': 'radioIt'
    },
    modelEvents: {
        'update': 'updateView'
    },

    onShow() {
        global.map = this;
        let map = this.map = L.map(this.el);
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
            let layer = L.esri.clusteredFeatureLayer(config.url, {
                pointToLayer(geojson, latlng) {
                    return L.marker(latlng, {
                        icon: L.icon({
                            iconUrl: 'http://cdn.flaticon.com/png/256/46248.png',
                            iconSize: [24, 24]
                        })
                    });
                }
            });

            // Register the popup template
            layer.bindPopup(feature => popupTemplate({config, properties: feature.properties}));
            //layer.setStyle();

            return {
                group: 'station',
                name: config.name,
                layer: layer,
                active: !index
            };
        });

        let stationLayers = _.pluck(this.stationLayers, 'layer');
        this.windLayer = new WindyLayer({
            url: 'gfs.json',
            opacity: 0.50,
            // Helper to get the station layer so we can
            // query the visible stations for wind vectors
            // Should probably be a service instead :/
            getStation() {
                return _.find(stationLayers, map.hasLayer, map);
            }
        });
        //this.windLayer.addTo(this.map);

        //Make menuControl responsible for adding the layers to the map
        this.menuControl = new L.Control.PanelLayers(this.baseLayers, this.stationLayers);
        this.map.addControl( this.menuControl );
    },

    // Update the view from the model if the hash isn't set (indicating the requested pose)
    updateView() {
        if (!location.hash) {
            this.map.setView(this.model.location, this.model.zoom);
        }
    },

    // Hacky radioizer for the checkboxs
    radioIt(event) {
        $(':checkbox', this.menuControl._container).not(event.target)
            .prop('checked', false);
    }
});
