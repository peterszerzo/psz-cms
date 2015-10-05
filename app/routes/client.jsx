import React from 'react';

import Banner from './../components/route_handlers/banner/root.jsx';
import About from './../components/route_handlers/about/root.jsx';

import ProjectsIndex from  './../components/route_handlers/projects/index/root.jsx';
import ProjectsShow from   './../components/route_handlers/projects/show/root.jsx';

import BlogPostsIndex from  './../components/route_handlers/blog_posts/index/root.jsx';
import BlogPostsShow from   './../components/route_handlers/blog_posts/show/root.jsx';

import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<div className='wrapper fill-parent' onScroll={this.logScroll.bind(this)}>
				{this.props.children}
			</div>
		);
	}

	logScroll(e) {
		console.log(React.findDOMNode(this).scrollTop);
	}

}

var routes = (
	<Router history={createBrowserHistory()}>
		<Route component={App}>
			<Route path='/' component={Banner} />

			<Route path='/projects' component={ProjectsIndex} />
			<Route path='/projects/:id' component={ProjectsShow} />

			<Route path='/blog' component={BlogPostsIndex} />
			<Route path='/blog/:id' component={BlogPostsShow} />

			<Route path='/about' component={About} />

		</Route>
	</Router>
);

export default routes;