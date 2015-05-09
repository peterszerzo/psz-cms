var express = require('express');
var fs = require('fs');
var app = express();
var projects = require('./projects.js');

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'jade')

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

var server = app.listen(3000);