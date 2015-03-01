var View = require('./View');
var Radio = require('backbone.radio');

let channel = Radio.channel('map');

channel.comply('show', () => {
	Radio.channel('content').command('content', new View());
});