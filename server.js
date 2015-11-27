import express from 'express'
import bodyParser from 'body-parser'
import pg from 'pg'

import serveGzipMiddleware from './app/middleware/serve_gzip.js'
import router from './app/routes/index.js'

var app = express()

var { NODE_ENV, PORT, DATABASE_URL, S3_BUCKET_NAME } = process.env

var isDev = NODE_ENV !== 'production'

app.set('views', __dirname + '/app/views')
app.set('view engine', 'jade')

app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
app.use(bodyParser.json())

// GZip serving middleware must be declared before static folder declaration. 
app.get([ '*.js', '*.json' ], serveGzipMiddleware)

// Serve post images from S3 bucket.
app.get('/images/posts/:id/:file', (req, res) => {
	var { id, file } = req.params
	res.redirect(`http://${S3_BUCKET_NAME}/images/posts/${id}/${file}`)
})

app.use(express.static('public'))

pg.connect(DATABASE_URL, function(err, client, done) {

	if (err == null) {
		app.use(function(req, res, next) {
			req.dbClient = client
			next()
		});
	} else {
		console.log('Could not connect to the database.')
	}

	app.use(router)

	app.listen(PORT, function() {
		console.log(`Server listening on port ${PORT}`)
	})

})