import View from './View';
import Model from './Items';

import Radio from 'backbone.radio';

let channel = Radio.channel('header');

channel.comply('show', () => {
    Radio.channel('content').command('header', new View({model: new Model()}));
});
