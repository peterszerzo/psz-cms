var express = require('express'),
	router = express.Router(),
	apiSubrouters = {
		project: require('./api/v1/project.js')
	},
	React = require('react'),
	Layout = require('../components/layout.jsx'),
	routes = require('./routes.js'),
	fs = require('fs');

var layoutFactory = React.createFactory(Layout);

router.use('/api/v1/projects', apiSubrouters.project);

router.get('/', function(req, res) {

	var route = routes['/'],
		html = React.renderToString(layoutFactory({ route: route }));;

	res.render('index.jade', { reactOutput: html });

});

router.get('/things', function(req, res) {

	var route = routes['/things'];

	apiSubrouters.project.callOnServer({ query: { is_live: true } }, function(err, projects) {
		if (err) { throw err; }
	 	var category = req.query.category || 'all',
	 		html = React.renderToString(layoutFactory({ route: route, projects: projects, category: category }));
	 	res.render('projects/index.jade', { reactOutput: html });
	});
	
});

router.get('/things/:id', function(req, res) {

	var route = routes['/things/:id'];

	apiSubrouters.project.callOnServer({ query: { id: req.params.id, is_live: true } }, function(err, projects) {
		if (err) { return res.redirect('/'); }
		var project = projects[0];
		if (project == null) { return res.redirect('/'); }
		var html = React.renderToString(layoutFactory({ route: route, project: project }));
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