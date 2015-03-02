import {Collection} from 'backbone';
import Radio from 'backbone.radio';

let layers = new Collection([
    // new Layer1, new Layer2...
]);


let channel = Radio.channel('map');

// Allows channel.request('layers') => layers
channel.reply('layers', () => layers);


export default layers;
