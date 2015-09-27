import React from 'react';
import Banner from './banner/root.jsx';
import Index from './projects/index/root.jsx';
import Show from './projects/show/root.jsx';
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
		<Route name="home" path='/' handler={Banner} />
		<Route name="things" path='/things' handler={Index} />
		<Route name="thing" path='/things/:id' handler={Show} />
	</Route>
);

export default routes;