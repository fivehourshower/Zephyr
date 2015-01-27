import L from 'leaflet';
import CollectionLayer from '../CollectionLayer';

export default class MultiPoint extends CollectionLayer {
    // http://leafletjs.com/reference.html#marker
    get options() {
        return {};
    }

    get Layer() {
        return L.layerGroup;
    }

    add(model) {
        model.layer = L.marker(model.attributes, this.options);
        this.layer.addLayer(model.layer);
    }
}