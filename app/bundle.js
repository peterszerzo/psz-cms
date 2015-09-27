import React from 'react';
import Router from 'react-router';
import routes from './components/routes.jsx';

global.psz = {

	start: () => {
		console.log('Hi, Mom!');
		Router.run(routes, Router.HistoryLocation, (Root, state) => {
			React.render(<Root />, global.document.getElementById('site'));
		});
	}

};