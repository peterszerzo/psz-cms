var $ = require('jquery'),
	Backbone = require('backbone');

module.exports = function() {

	var Router = Backbone.Router.extend({

		routes: {
			'/': 'welcome'
		},

		welcome: function() {
			console.log('welcome');
		}

	});

	var router = new Router();

	Backbone.history.start({ pushState: true });

};