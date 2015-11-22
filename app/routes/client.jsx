import React from 'react'
import { Router, Route } from 'react-router'
import createHistory from 'history/lib/createBrowserHistory'

import Banner from './../components/route_handlers/banner/root.jsx'
import About from './../components/route_handlers/about/root.jsx'

import { createStore, compose, combineReducers } from 'redux'
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router'
import { Provider } from 'react-redux'

import Layout from './../components/general/layout.jsx'

import Index from './../components/route_handlers/posts/index/root.jsx'
import Show from './../components/route_handlers/posts/show/root.jsx'
import EditPost from './../components/route_handlers/posts/edit/root.jsx'

import reducer from './../redux/reducers/index.js'

function ProjectsIndex(props) { return <Index { ...props } activeLinkName={'projects'} postType={'project'} /> }
function BlogPostsIndex(props) { return <Index { ...props } activeLinkName={'blog'} postType={'blog_post'} /> }

var appReducer = combineReducers({ app: reducer, router: routerStateReducer })

var store = compose(
	reduxReactRouter({ createHistory })
)(createStore)(appReducer)

var routes = (
	<Provider store={store}>
		<ReduxRouter>
			<Router>
				<Route component={Layout}>
					<Route path='/' component={Banner} />
					<Route path='/about' component={About} />
					<Route path='/projects' component={ProjectsIndex} />
					<Route path='/blog' component={BlogPostsIndex} />
					{
					// <Route path='/admin/posts'>
					// 	<Route path='new' component={EditPost} />
					// </Route>
					}
					<Route path='/:id' component={Show} />
				</Route>
			</Router>
		</ReduxRouter>
	</Provider>
)

export default routes