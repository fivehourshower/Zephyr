import './mixins';
import Backbone from 'backbone';
import Application from './application/application';




let app = new Application();


Promise.all([$.ready.promise()]).then(() => {
	Backbone.history.start();
	app.start();
});
