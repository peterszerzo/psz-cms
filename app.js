var express = require('express');
var fs = require('fs');
var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'jade')

app.use(express.static('public'));

app.get('/', function(req, res) {
	fs.readFile(__dirname + '/public/data/projects.json', function(err, data) {
		if (err) { throw err; }
		var projects = JSON.parse(data);
		res.render('index.jade', { projects: projects });
	});
	
});

app.get('/projects/:id', function(req, res) {
	fs.readFile(__dirname + '/public/data/projects.json', function(err, data) {
		if (err) { throw err; }
		var projects = JSON.parse(data),
			project = projects[0];
		res.render('projects/show.jade', { project: project });
	});
});

var server = app.listen(3000);