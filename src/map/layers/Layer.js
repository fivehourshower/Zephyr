// Base layer class to be extended by other layers.
// A layer provides bindings between a data source and
// a map layer. A map layer of course can be a vector
// (point, line, polygon) or a raster. A layer can also
// have a grouping type - useful for the layer menu.
import {Model} from 'backbone';
import _ from 'underscore';

export default class Layer extends Model {
    constructor() {
        super();
        let LLayer = this.Layer;
        this.layer = _.isFunction(LLayer) ?
                        new LLayer(this.data, this.options) :
                        LLayer;
        this.layer.model = this;
        this.on('change', this.update);
    }

    update(model, update) {
        console.warn('update not implemented');
    }

    get data() {
        console.warn('get data not implemented');
    }

    get options() {

    }

    destroy() {
        this.layer = this.layer.model = null;
    }
}
