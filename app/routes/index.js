var express = require('express'),
	router = express.Router(),
	apiSubrouters = {
		project: require('./api/v1/project.js')
	},
	React = require('react'),
	comp = require('../components/index.jsx'),
	routes = require('./routes.js'),
	fs = require('fs');

router.use('/api/v1/projects', apiSubrouters.project);

router.get('/', function(req, res) {

	var route = routes['/'],
		factory = React.createFactory(comp.Layout),
		html = React.renderToString(factory(route));;

	res.render('index.jade', { reactOutput: html });

});

router.get('/things', function(req, res) {

	var route = routes['/things'];

	apiSubrouters.project.callOnServer({ query: { is_live: true } }, function(err, data) {
		if (err) { throw err; }
	 	var category = req.query.category || 'all',
	 		factory = React.createFactory(comp.Projects.Index),
	 		html = React.renderToString(factory({ items: data, category: category }));
	 	res.render('projects/index.jade', { reactOutput: html });
	});
	
});

router.get('/things/:id', function(req, res) {

	var route = routes['/things:id'];

	apiSubrouters.project.callOnServer({ query: { id: req.params.id, is_live: true } }, function(err, data) {
		if (err) { return res.redirect('/'); }
		var datum = data[0];
		if (datum == null) { return res.redirect('/'); }
		var factory = React.createFactory(comp.Projects.Show),
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