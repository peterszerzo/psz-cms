import React from 'react'
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

// import { Provider } from 'react-redux'
// import { createStore, combineReducers } from 'redux'

import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'

import reducer from './../redux/reducers/index'

import Banner from './../components/route_handlers/banner/root.jsx'
import About from './../components/route_handlers/about/root.jsx'

import ProjectsIndex from  './../components/route_handlers/projects/index/root.jsx'
import ProjectsShow from   './../components/route_handlers/projects/show/root.jsx'

import BlogPostsIndex from  './../components/route_handlers/blog_posts/index/root.jsx'
import BlogPostsShow from   './../components/route_handlers/blog_posts/show/root.jsx'


class App extends React.Component {

	/*
	 *
	 *
	 */
	render() {
		return (
			<div className='wrapper fill-parent'>
				{this.props.children}
			</div>
		)
	}

}

var history = createBrowserHistory()
// var store = createStore()

// syncReduxAndRouter

var routes = (
	<Router history={history}>
		<Route component={App}>
			<Route path='/' component={Banner} />

			<Route path='/projects' component={ProjectsIndex} />
			<Route path='/projects/:id' component={ProjectsShow} />

			<Route path='/blog' component={BlogPostsIndex} />
			<Route path='/blog/:id' component={BlogPostsShow} />

			<Route path='/about' component={About} />

		</Route>
	</Router>
)

export default routes