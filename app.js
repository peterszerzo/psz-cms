require('babel/register')({
	// extensions: [ '.es6' ]
});

var pingHeroku = require('./misc/ping_heroku'),
	express = require('express'),
	app = express(),
	router,
	bodyParser = require('body-parser');

setInterval(pingHeroku, 5 * 60 * 1000);

require('node-jsx').install({extension: '.jsx'});

app.set('views', __dirname + '/app/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.static('public'));

router = require('./app/routes/index.js');
app.use(router);

app.listen(process.env.PORT || 3000);