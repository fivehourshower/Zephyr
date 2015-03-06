import _ from 'lodash';
import L from 'leaflet';

import CanvasOverlay from './CanvasOverlay'
import Windy from './windy'
import $ from 'jquery';

export default class WindyLayer extends CanvasOverlay {
    initialize({url = ''} = {}) {
        super.initialize(...arguments);

        // Load the GFS data
        $.getJSON(url, data => {
            this.data = data;
            // Start rendering if the layers active
            if (this.canvas()) {
                setTimeout(this._reset.bind(this), 100);
            }
        });
    }

    onAdd() {
        super.onAdd(...arguments);
        this.windy = new Windy({
            canvas: this.canvas(),
            data: this.data
        });
    }

    onRemove() {
        super.onRemove(...arguments);
        this.windy.stop();
        this.windy = null;
    }

    render() {
        // Defer for data
        if (!this.data) return;

        this.windy.stop();

        let {width, height} = this._canvas;
        let bounds = this._map.getBounds();
        let {lng: xmax, lat: ymax} = bounds.getNorthEast(),
            {lng: xmin, lat: ymin} = bounds.getSouthWest();
        this.windy.start([[0, 0], [width, height]],
            width, height,
            [[xmin, ymin], [xmax, ymax]]);
    }
};
