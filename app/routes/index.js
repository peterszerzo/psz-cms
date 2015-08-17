var express = require('express'),
	router = express.Router(),
	React = require('react'),
	Layout = require('../components/layout.jsx'),
	routes = require('./routes.js'),
	project = require('./../models/project.js'),
	fs = require('fs');

var layoutFactory = React.createFactory(Layout);

router.use('/api/v1/projects', require('./api/v1/project.js'));
router.use('/api/v1/categories', require('./api/v1/category.js'));

router.get('/', function(req, res) {

	var route = routes['/'],
		html;

	//html = React.renderToString(layoutFactory({ route: route }));;
	res.render('layout.jade', { reactOutput: html });

});

router.get('/things', function(req, res) {

	var route = routes['/things'];
	
	var coll = new project.Collection();
	var promise = coll.getFetchPromise({ is_live: true });
	promise.then((coll) => {
	 	var category = req.query.category || 'all',
	 		html;
	 	//html = React.renderToString(layoutFactory({ route: route, projects: coll.toJSON(), category: category }));
	 	res.render('layout.jade', { reactOutput: html });
	}, () => { res.redirect('/'); });
	
});

router.get('/things/:id', function(req, res) {

	var route = routes['/things/:id'];

	var coll = new project.Collection();
	var promise = coll.getFetchPromise({ is_live: true, id: req.params.id });
	promise.then((coll) => {
		if (coll.models == null || coll.models[0] == null) { return res.redirect('/'); }
		var project = coll.models[0];
		var html;
		//html = React.renderToString(layoutFactory({ route: route, project: project.toJSON() }));
		res.render('layout.jade', { reactOutput: html });
	}, () => { res.redirect('/'); });

});

router.get('/about', function(req, res) {
	res.redirect('/things/about');
});

module.exports = router;