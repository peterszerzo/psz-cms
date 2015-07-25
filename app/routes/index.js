var express = require('express'),
	router = express.Router(),
	project = require('../models/project'),
	React = require('react'),
	Components = require('../components/index.jsx'),
	fs = require('fs');

router.get('/', function(req, res) {
	var factory = React.createFactory(Components.Home),
		html = React.renderToString(factory());
	res.render('index.jade', { reactOutput: html });
});

router.get('/things', function(req, res) {

	project.get({ is_live: true }, function(err, data) {
		if (err) { throw err; }
		var factory = React.createFactory(Components.Projects.Index),
			html = React.renderToString(factory({ items: data, category: req.params.category }));
		res.render('projects/index.jade', { reactOutput: html });
	});
	
});

router.get('/things/:id', function(req, res) {

	var coll = new project.Collection();
	coll.fetchFromDb({}, function(err, coll) { console.log(coll.toJSON()); });

	project.get({ id: req.params.id, is_live: true }, function(err, datum) {
		if (err) { throw err; }
		var factory = React.createFactory(Components.Projects.Show),
			html = React.renderToString(factory({ item: datum }));
		res.render('projects/index.jade', { reactOutput: html });
	});

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