var React = require('react'),
	Backbone = require('backbone'),
	// Router = require('react-router'),
	Layout = require('./components/layout.jsx'),
	routes = require('./components/routes.jsx'),
	models = require('./models/index.js'),
	globe = require('./assets/script/globe.js');

// global.Router = Router;
global.Backbone = Backbone;

global.psz = {
	React: React,
	Layout: Layout,
	routes: routes,
	models: models,
	globe: globe
};

// Router.run(routes, Router.HistoryLocation, (Root) => {
// 	React.render(<Root />, global.document.body);
// });