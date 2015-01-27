import MultiPoint from './MultiPoint';

export default class PouchPoints extends MultiPoint {
    initialize(points, options) {
        this.connection = options.connection.changes({
            live: true
        }).on('change', change => this.add(change));
    }

    destroy() {

    }
}
