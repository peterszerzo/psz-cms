require('babel-core/register')

var express = require('express'),
	bodyParser = require('body-parser'),
	pg = require('pg'),
	webpackDevMiddleware = require('webpack-dev-middleware'),
	webpack = require('webpack');

var app = express(),
	router = require('./app/routes/index.js').default;

var isDev = process.env['NODE_ENV'] !== 'production';

if (isDev) { require('dotenv').load(); }

app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

// GZip serving middleware must be declared before static folder declaration. 
app.get([ '*.js', '*.json' ], require('./app/middleware/serve_gzip.js').default);

// if (isDev) {
// 	app.use(webpackDevMiddleware(webpack(require('./webpack.config.js')), {
// 		lazy: false
// 	}))
// }

app.use(express.static('public'));

var port = process.env.PORT,
	dbUrl = process.env['DATABASE_URL'];

pg.connect(dbUrl, function(err, client, done) {

	if (err == null) {
		app.use(function(req, res, next) {
			req.dbClient = client;
			next();
		});
	}

	app.use(router);

	app.listen(port, function() {
		console.log('Server listening on port ' + port);
	});

});