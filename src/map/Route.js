import {Model} from 'backbone';

let location = [43.4668, -80.5164], model;
navigator.geolocation.getCurrentPosition(pose => {
    let {latitude: lat, longitude: lng} = pose.coords;
    location = [lat, lng];
    if (model) model.triggerUpdate();
});

export default class Route extends Model {
    initialize() {
        model = this;
    }

    triggerUpdate() {
        if (!this.triggered) {
            this.trigger('update');
        }
        this.triggered = true;
    }

    get location() {
        return location;
    }

    get zoom() {
        return 10;
    }
};
