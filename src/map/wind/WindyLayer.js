import _ from 'lodash';
import L from 'leaflet';
require('Leaflet.Canvas/leaflet_canvas_layer');

import Windy from './windy'

export default L.CanvasLayer.extend({
    initialize(data, {opacity = 50} = {}) {
        L.CanvasLayer.prototype.initialize.call(this);

        this.data = data;
        this.windy = new Windy({
            canvas: this.getCanvas(),
            data: this.data
        });
        this.setOpacity(opacity);
    },

    render() {
        console.log('here');
        this.windy.stop();
        this.update();
    },

    update: _.throttle(function() {
        let {width, height} = this._canvas;
        let bounds = this._map.getBounds();
        let {lng: xmax, lat: ymax} = bounds.getNorthEast(),
            {lng: xmin, lat: ymin} = bounds.getSouthWest();
        this.windy.start([[0, 0], [width, height]],
            width, height,
            [[xmin, ymin], [xmax, ymax]]);
    }, 100, {leading: false})
});
