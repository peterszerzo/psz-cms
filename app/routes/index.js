import * as express from 'express';
import * as Router from 'react-router';
import * as routes from './../components/routes.jsx';
import * as React from 'react';

var router = express.Router();

router.use('/api/v1/projects', require('./api/v1/project.js'));

router.get('*', (req, res) => {
	Router.run(routes, req.path, (Root, state) => {
		var html = React.renderToString(<Root />);
		res.render('layout.jade', { reactOutput: html });
	});
});


export default router;