import React from 'react'
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import Banner from './../components/route_handlers/banner/root.jsx'
import About from './../components/route_handlers/about/root.jsx'


import Index from './../components/route_handlers/posts/index/root.jsx'
import Show from './../components/route_handlers/posts/show/root.jsx'

// App component
function App(props) {

	return (
		<div className='wrapper fill-parent'>
			{ props.children }
		</div>
	)

}

console.log(Index)

function ProjectsIndex(props) {
	return <Index { ...props } activeLinkName={'projects'} postType={'project'} />
}

function BlogPostsIndex(props) {
	return <Index { ...props } activeLinkName={'blog'} postType={'blog_post'} />
}

var history = createBrowserHistory()

var routes = (
	<Router history={history}>
		<Route component={App}>
			<Route path='/' component={Banner} />

			<Route path='/about' component={About} />

			<Route path='/projects' component={ProjectsIndex} />

			<Route path='/blog' component={BlogPostsIndex} />

			<Route path='/:id' component={Show} />

		</Route>
	</Router>
)

export default routes