var React = require('react'),
	Backbone = require('backbone'),
	$ = require('jquery'),
	Router = require('react-router'),
	Layout = require('./components/layout.jsx'),
	routes = require('./components/routes.jsx'),
	models = require('./models/index.js'),
	globe = require('./assets/script/globe.js'),
	geoJsonGenerator = require('./assets/script/geojson_generator.js'),
	init = require('./assets/script/init.js');

global.$ = $;
global.Router = Router;
global.Backbone = Backbone;

global.psz = {
	React: React,
	Layout: Layout,
	routes: routes,
	models: models,
	init: init,
	geoJsonGenerator: geoJsonGenerator,
	globe: globe
};

Router.run(routes, Router.HistoryLocation, (Root) => {
	React.render(<Root />, global.document.body);
});