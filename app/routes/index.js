var express = require('express'),
	router = express.Router(),
	project = require('../models/project'),
	React = require('react'),
	ProjectsFactory = React.createFactory(require('../components/projects.jsx')),
	fs = require('fs');

router.get('/', function(req, res) {
	res.render('index.jade');
});

router.get('/projects', function(req, res) {
	project.request(undefined, function(err, data) {
		if (err) { throw err; }
		var html = React.renderToString(ProjectsFactory({ items: data }));
		res.render('projects/index.jade', { projects: data, reactOutput: html });
	});
});

router.get('/projects/:id', function(req, res) {
	project.request(req.params.id, function(err, datum) {
		if (err) { throw err; }
		res.render('projects/show.jade', { project: datum });
	});
});

router.get('/terrain', function(req, res) {
	res.render('terrain-graphics.jade');
});

router.post('/save', function(req, res) {
	// console.dir(req.body.geo);
	fs.writeFile('public/data/geo/geo.json', req.body.geo, function(err) {
		if (err) { throw err; }
	});
});

module.exports = router;