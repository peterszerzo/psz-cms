import React from 'react'
import { Link } from 'react-router'
import fetch from 'isomorphic-fetch'
import _ from 'underscore'
import { connect } from 'react-redux'

import { Loader } from './../../../general/loader.jsx'

import Groups from './groups.jsx'

var groupDescriptions = {
	'featured': 'Things on my mind these days. An incomplete collection.',
	'recent': 'A blend of mostly finished technical and creative endeavors.',
	'nostalgia': 'The childhood project(s) that got me started.',
	'personal': 'Thoughts, stories, the occasional low-key rambling.',
	'technical': 'Tricks I learn while dabbling with technology.'
}


/*
 *
 *
 */
class Index extends React.Component {

	/*
	 *
	 *
	 */
	constructor(props) {
		super(props)
		this.state = this.state || {}
	}


	/*
	 *
	 *
	 */
	render() {
		var resources = _.where(this.getResources(), { type: this.props.postType })
		if (resources == null) { return <Loader /> }
		var resourceGroups = _.groupBy(resources, resource => resource.post_group)
		return (
			<div className='wrapper__clear-header fill-parent'>
				<Groups groupDescriptions={groupDescriptions} resourceGroups={resourceGroups}/>
			</div>
		)
	}


	/*
	 * Fetch post summary and set to state.
	 *
	 */
	componentDidMount() {

		if (this.getResources()) { return }

		fetch('/api/v2/posts?fields=(id,name,post_group,type)')
			.then(res => res.json())
			.then((posts) => {
				if (_.isArray(posts)) {
					this.props.dispatch({ type: 'FETCH_ALL_POST_SUMMARIES_SUCCESS', data: posts })
				}
			}).catch((err) => { console.log(err.stack) })
		

	}


	/*
	 *
	 *
	 */
	getResources() {
		// return this.state.resources
		var { postSummaries } = this.props
		if (!postSummaries) { return }
		var { status, data } = postSummaries
		if (status === 'success') { return data }
	}

}

export default connect(state => ({ 
	router: state.router,
	postSummaries: state.app.entities.posts.summaries
}))(Index)