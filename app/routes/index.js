var express = require('express'),
	router = express.Router(),
	project = require('../models/project'),
	React = require('react'),
	Components = require('../components/index.js'),
	fs = require('fs');

router.get('/', function(req, res) {
	var factory = React.createFactory(Components.Home),
		html = React.renderToString(factory());
	res.render('index.jade', { reactOutput: html });
});

router.get('/projects', function(req, res) {
	project.request(undefined, function(err, data) {
		if (err) { throw err; }
		var factory = React.createFactory(Components.Projects.Index),
			html = React.renderToString(factory({ items: data }));
		res.render('projects/index.jade', { reactOutput: html });
	});
});

router.get('/projects/:id', function(req, res) {
	project.request(req.params.id, function(err, datum) {
		if (err) { throw err; }
		var factory = React.createFactory(Components.Projects.Show),
			html = React.renderToString(factory({ item: datum }));
		res.render('projects/index.jade', { reactOutput: html });
	});
});

router.get('/terrain', function(req, res) {
	res.render('terrain-graphics.jade');
});

router.post('/save', function(req, res) {
	fs.writeFile('public/data/geo/geo.json', req.body.geo, function(err) {
		if (err) { throw err; }
		console.log('save successful!');
	});
});

module.exports = router;