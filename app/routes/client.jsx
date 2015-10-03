import React from 'react';
import Banner from './../components/route_handlers/banner/root.jsx';
import Index from  './../components/route_handlers/projects/index/root.jsx';
import Show from   './../components/route_handlers/projects/show/root.jsx';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

class App extends React.Component {
	render() {
		return (
			<div className='wrapper fill-parent'>
				{this.props.children}
			</div>
		);
	}
}

var routes = (
	<Router history={createBrowserHistory()}>
		<Route component={App}>
			<Route path='/' component={Banner} />
			<Route path='/things' component={Index} />
			<Route path='/things/:id' component={Show} />
		</Route>
	</Router>
);

export default routes;