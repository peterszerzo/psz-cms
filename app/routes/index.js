var express = require('express'),
	request = require('request'),
	router = express.Router(),
	projectSubrouter = require('./api/v1/projects.js'),
	project = require('../models/project'),
	React = require('react'),
	Components = require('../components/index.jsx'),
	fs = require('fs');

router.use('/api/v1/projects', projectSubrouter);

router.get('/', function(req, res) {
	var factory = React.createFactory(Components.Banner),
		html = React.renderToString(factory());
	res.render('index.jade', { reactOutput: html });
});

router.get('/things', function(req, res) {

	projectSubrouter.server({ query: { is_live: true } }, function(err, data) {
		if (err) { throw err; }
	 	var category = req.query.category || 'all';
	 	var factory = React.createFactory(Components.Projects.Index),
	 		html = React.renderToString(factory({ items: data, category: category }));
	 	res.render('projects/index.jade', { reactOutput: html });
	});
	
});

router.get('/things/:id', function(req, res) {

	var coll = new project.Collection();

	projectSubrouter.server({ query: { id: req.params.id, is_live: true } }, function(err, data) {
		if (err) { return res.redirect('/'); }
		var datum = data[0];
		if (datum == null) { return res.redirect('/'); }
		var factory = React.createFactory(Components.Projects.Show),
			html = React.renderToString(factory({ item: datum }));
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