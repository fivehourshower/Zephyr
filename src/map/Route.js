import {Model, history, Router} from 'backbone';

let model;
let lat = 43.4668, lng = -80.5164, zoom = 9;

navigator.geolocation.getCurrentPosition(pose => {
    lat = pose.coords.latitude;
    lng = pose.coords.longitude;
    if (model) model.triggerUpdate();
});

let router = global.router = new (Router.extend({
    routes: {
        'map/*latlngzoom': 'onRoute'
    },
    onRoute(hash) {
        [lat, lng, zoom] = hash.split(',');
        if (model) model.triggerUpdate();
    }
}));

export default class Route extends Model {
    initialize() {
        model = this;
    }

    update(array) {
        [lat, lng, zoom] = array;
        router.navigate(`map/${lat},${lng},${zoom}`)
    }

    triggerUpdate() {
        if (!this.triggered) {
            this.trigger('update');
        }
        this.triggered = true;
    }

    get location() {
        return [lat, lng];
    }

    get zoom() {
        return zoom;
    }
};
