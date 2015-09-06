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
		<Route path='/' handler={Banner} />
		<Route path='/things' handler={Index} />
		<Route path='/things/:id' handler={Show} />
	</Route>
);

export default routes;