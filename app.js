require('babel/register')({ extensions: [ '.jsx', '.js' ] });

var pingHeroku = require('./misc/ping_heroku'),
	express = require('express'),
	bodyParser = require('body-parser');

var app = express(),
	router = require('./app/routes/index.js');
 
setInterval(pingHeroku, 15 * 60 * 1000);

app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.static('public'));

app.use(router);

var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log('Server listening on port ' + port);
});