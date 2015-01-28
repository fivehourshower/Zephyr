import './mixins';

// Radio channels
import './login/Service';
import Radio from 'backbone.radio';

import {ready} from 'jquery';
import Backbone from 'backbone';
import Application from './application/application';

let app = new Application();

Promise.all([ready.promise()]).then(() => app.start());

app.on('start', () => {
    Radio.channel('auth').command('login');

    Backbone.history.start();
});