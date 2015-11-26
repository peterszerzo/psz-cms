import React from 'react'
import { Router, Route } from 'react-router'
import createHistory from 'history/lib/createBrowserHistory'

import { createStore, compose, combineReducers } from 'redux'
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router'
import { Provider } from 'react-redux'

import Layout from './../components/general/layout.jsx'

import Banner from './../components/route_handlers/banner/root.jsx'
import About from './../components/route_handlers/about/root.jsx'

// Post route handlers
import Index from './../components/route_handlers/posts/index/root.jsx'
import Show from './../components/route_handlers/posts/show/root.jsx'
import EditPost from './../components/route_handlers/posts/edit/root.jsx'

// Import reducer.
import reducer from './../reducers/index.js'

// Compose app reducer by combining the custom-written reducer with the route state reducer.
var appReducer = combineReducers({ app: reducer, router: routerStateReducer })

// Create application store.
var store = compose(
	reduxReactRouter({ createHistory })
)(createStore)(appReducer)

// Create higher-order components for projects and blog routes.
function ProjectsIndex(props) { return <Index { ...props } activeLinkName={'projects'} postType={'project'} /> }
function BlogPostsIndex(props) { return <Index { ...props } activeLinkName={'blog'} postType={'blog_post'} /> }

var routes = (
	<Provider store={store}>
		<ReduxRouter>
			<Router>
				<Route component={Layout}>

					<Route path='/' component={Banner} />
					<Route path='/about' component={About} />
					<Route path='/projects' component={ProjectsIndex} />
					<Route path='/blog' component={BlogPostsIndex} />

					<Route path='/admin/posts'>
						<Route path='new' component={EditPost} />
						<Route path=':id/:action' component={EditPost} />
					</Route>

					<Route path='/:id' component={Show} />
					
				</Route>
			</Router>
		</ReduxRouter>
	</Provider>
)

export default routes