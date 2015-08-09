var express = require('express'),
	router = express.Router(),
	React = require('react'),
	Layout = require('../components/layout.jsx'),
	routes = require('./routes.js'),
	project = require('./../models/project.js'),
	fs = require('fs');

var layoutFactory = React.createFactory(Layout);

router.use('/api/v1/projects', require('./api/v1/project.js'));

router.get('/', function(req, res) {

	var route = routes['/'],
		html = React.renderToString(layoutFactory({ route: route }));;

	res.render('index.jade', { reactOutput: html });

});

router.get('/things', function(req, res) {

	var route = routes['/things'];
	
	var coll = new project.Collection();
	coll.fetch({ is_live: true });
	coll.on('fetched', function() {
	 	var category = req.query.category || 'all',
	 		html = React.renderToString(layoutFactory({ route: route, projects: coll.toJSON(), category: category }));
	 	res.render('projects/index.jade', { reactOutput: html });
	});
	
});

router.get('/things/:id', function(req, res) {

	var route = routes['/things/:id'];

	var coll = new project.Collection();
	coll.fetch({ is_live: true, id: req.params.id });
	coll.on('fetched', function() {
		if (coll.models == null || coll.models[0] == null) { return res.redirect('/'); }
		var project = coll.models[0];
		var html = React.renderToString(layoutFactory({ route: route, project: project.toJSON() }));
		res.render('projects/index.jade', { reactOutput: html });
	});

});

router.get('/about', function(req, res) {
	res.send('Page coming soon!');
});

// Development routes
router.get('/dev/terrain', function(req, res) {
	res.render('terrain-graphics.jade');
});

router.post('/dev/save', function(req, res) {
	fs.writeFile('public/data/geo/geo.json', req.body.geo, function(err) {
		if (err) { throw err; }
		console.log('save successful!');
	});
});

module.exports = router;