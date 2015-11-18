import express from 'express'
import bodyParser from 'body-parser'
import pg from 'pg'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpack from 'webpack'

import serveGzipMiddleware from './app/middleware/serve_gzip.js'
import router from './app/routes/index.js'

var app = express()

var { NODE_ENV, PORT, DATABASE_URL } = process.env

var isDev = NODE_ENV !== 'production'

app.set('views', __dirname + '/app/views')
app.set('view engine', 'jade')

app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
app.use(bodyParser.json())

// GZip serving middleware must be declared before static folder declaration. 
app.get([ '*.js', '*.json' ], serveGzipMiddleware)

app.use(express.static('public'))

pg.connect(DATABASE_URL, function(err, client, done) {

	if (err == null) {
		app.use(function(req, res, next) {
			req.dbClient = client;
			next();
		});
	}

	app.use(router);

	app.listen(PORT, function() {
		console.log(`Server listening on port ${PORT}`);
	});

});