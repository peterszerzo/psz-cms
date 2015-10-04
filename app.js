require('babel/register');

var express = require('express'),
	bodyParser = require('body-parser'),
	buildSeeds = require('./db/utilities/build_seeds.js');

var app = express(),
	router = require('./app/routes/index.js');
 
// buildSeeds({ collectionName: 'blog' }, function(err) { if (err) { return console.dir(err); } console.log('all good'); });

app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.static('public'));

app.use(router);

var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log('Server listening on port ' + port);
});