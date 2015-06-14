var express = require('express'),
	app = express(),
	router,
	bodyParser = require('body-parser');

require('node-jsx').install({extension: '.jsx'});

app.set('views', __dirname + '/app/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

router = require('./app/routes/index.js');
app.use(router);

app.listen(process.env.PORT || 3000);