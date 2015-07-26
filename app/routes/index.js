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

	var coll = new project.Collection();

	coll.fetchFromDb({ is_live: true }, function(err, coll) {
		if (err) { throw err; }
		var data = coll.toJSON();
		var category = req.query.category || 'all';
		var factory = React.createFactory(Components.Projects.Index),
			html = React.renderToString(factory({ items: data, category: category }));
		res.render('projects/index.jade', { reactOutput: html });
	});
	
});

router.get('/things/:id', function(req, res) {

	var coll = new project.Collection();

	coll.fetchFromDb({ id: req.params.id, "is_live": true }, function(err, coll) {
		if (err) { return res.redirect('/'); }
		var model = coll.models[0];
		if (model == null) { return res.redirect('/'); }
		var datum = coll.models[0].toJSON();
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