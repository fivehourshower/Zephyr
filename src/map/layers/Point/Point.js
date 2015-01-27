import Layer from '../Layer';
import L from 'leaflet';

// This layer is useful for displaying a point that updates
// over time. Such as the position of a robot or the gps
// on the device.
export default class Point extends Layer {
    // http://leafletjs.com/reference.html#marker
    get options() {
        return {};
    }

    get Layer() {
        return L.marker;
    }

    update() {
        this.layer.setLatLng(this.data);
    }
}