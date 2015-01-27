import Point from './Point';

export default class PositionPoint extends Point {
    initialize() {
        navigator.geolocation.watchPosition((pose) => {
            this.set({
                lat: pose.coords.latitude,
                lng: pose.coords.longitude,
                elev: pose.coords.altitude,
                elevAccuracy: pose.coords.altitudeAccuracy,
                heading: pose.coords.heading,
                accuracy: pose.coords.accuracy
            });
        });
    }
}
