require('babel/register');

var express = require('express'),
	bodyParser = require('body-parser'),
	pg = require('pg');

var app = express(),
	router = require('./app/routes/index.js');

if (process.env['NODE_ENV'] !== 'production') {
	require('dotenv').load();
}

app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

// GZip serving middleware must be declared before static folder declaration. 
app.get([ '*.js', '*.json' ], require('./app/middleware/serve_gzip.js'));

app.use(express.static('public'));

var port = process.env.PORT,
	dbUrl = process.env['DATABASE_URL'];

pg.connect(dbUrl, function(err, client, done) {

	if (err != null) {
		console.log(client);
		app.use(function(req, res, next) {
			req.dbClient = client;
			next();
		});
	} else {
		console.log(err);
	}

	app.use(router);

	app.listen(port, function() {
		console.log('Server listening on port ' + port);
	});

});