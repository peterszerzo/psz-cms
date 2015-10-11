require('babel/register');

var express = require('express'),
	bodyParser = require('body-parser'),
	buildSeeds = require('./db/utilities/build_seeds.js');

var app = express(),
	router = require('./app/routes/index.js');
 
 
// buildSeeds({ collectionName: 'blog_posts' }, function(err) { if (err) { return console.dir(err); } console.log('all good'); });
// buildSeeds({ collectionName: 'projects' }, function(err) { if (err) { return console.dir(err); } console.log('all good'); });

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