import React from 'react';
import Router from 'react-router';
import routes from './../../routes/client.jsx';

global.psz = {

	start: () => {
		console.log('Hi, Mom!');
		React.render(routes, global.document.getElementById('site'));
	}

};