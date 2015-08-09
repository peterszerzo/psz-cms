var $ = require('jquery'),
	Backbone = require('backbone'),
	Layout = require('./components/layout.jsx'),
	models = require('./models/index.js'),
	routes = require('./routes/routes.js'),
	globe = require('./assets/script/globe.js'),
	geoJsonGenerator = require('./assets/script/geojson_generator.js'),
	init = require('./assets/script/init.js');

module.exports = {
	Layout: Layout,
	routes: routes,
	models: models,
	init: init,
	geoJsonGenerator: geoJsonGenerator,
	globe: globe
};

global.$ = $;
global.Backbone = Backbone;
global.psz = module.exports;