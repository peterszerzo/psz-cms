var express = require('express'),
	fs = require('fs'),
	http = require('http'),
	app = express(),
	projects = require('./models/projects.js'),
	bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'jade')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', function(req, res) {
	projects.request(undefined, function(err, data) {
		if (err) { throw err; }
		res.render('index.jade', { projects: data });
	});
	
});

app.get('/projects/:id', function(req, res) {
	projects.request(req.params.id, function(err, datum) {
		if (err) { throw err; }
		res.render('projects/show.jade', { project: datum });
	});
});

app.get('/terrain', function(req, res) {
	res.render('terrain-graphics.html');
});

app.post('/save', function(req, res) {
	console.dir(req.body.geo);
	fs.writeFile('public/data/geo/geo.json', req.body.geo, function(err) {
		if (err) { throw err; }
	});
});

var server = app.listen(process.env.PORT || 3000);