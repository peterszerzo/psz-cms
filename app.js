require('babel/register');

var express = require('express'),
	bodyParser = require('body-parser');

var app = express(),
	router = require('./app/routes/index.js');
 
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

// GZip serving middleware must be declared before static folder declaration. 
app.get([ '*.js', '*.json' ], require('./app/middleware/serve_gzip.js'));

app.use(express.static('public'));

app.use(router);

var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log('Server listening on port ' + port);
});