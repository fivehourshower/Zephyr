// Base layer class to be extended by other layers.
// A layer provides bindings between a data source and
// a map layer. A map layer of course can be a vector
// (point, line, polygon) or a raster. A layer can also
// have a grouping type - useful for the layer menu.

import {Collection} from 'backbone';
import _ from 'underscore';

export default class CollectionLayer extends Collection {
    constructor() {
        super();
        let LLayer = this.Layer;
        this.layer = _.isFunction(LLayer) ?
                        new LLayer(this.toJSON(), this.options) :
                        LLayer;
        this.on('add', this.update);
    }

    add(model) {
        this.layer.addLatLng(model.attributes);
    }

    get options() {
        
    }

    destroy() {
        this.each(model => {
            // gcs are generally pretty good at this, but doesn't hurt
            model.layer = model.layer.model = null;
        });
        this.models = null;
    }
}