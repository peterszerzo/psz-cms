import React from 'react';
import Banner from './banner.jsx';
import Projects from './projects.jsx';
import { Router, Route, RouteHandler, Redirect } from 'react-router';
import { history } from 'react-router/lib/History';

class App extends React.Component {
	render() {
		return (
			<div className='wrapper fill-parent'>
				<RouteHandler />
			</div>
		);
	}
}

var routes = (
	<Route handler={App}>
		<Route path='' handler={Banner} />
		<Route path='things' handler={Projects.Index} />
		<Route path='things/:id' handler={Projects.Show} />
	</Route>
);

export default routes;