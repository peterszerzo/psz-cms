import React from 'react'
import { Link } from 'react-router'
import fetch from 'isomorphic-fetch'
import _ from 'underscore'
import { connect } from 'react-redux'

import { Loader } from './../../../general/loader.jsx'

import Groups from './groups.jsx'
import NewList from './new_list.jsx'


class Index extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		var resources = _.where(this.getResources(), { type: this.props.postType })
		if (resources == null) { return <Loader /> }
		var resourceGroups = _.groupBy(resources, resource => resource.post_group)
		return (
			<div className='fill-parent'>
				{ /* <Groups resourceGroups={resourceGroups}/> */ }
				<NewList posts={resources} />
			</div>
		)
	}

	componentDidMount() {
		if (this.getResources()) { return }
		fetch('/api/v2/posts?fields=(id,name,post_group,type)')
			.then(res => res.json())
			.then((posts) => {
				if (_.isArray(posts)) {
					posts = posts.sort((p1, p2) => (p1['display_order'] - p2['display_order']))
					this.props.dispatch({ type: 'FETCH_ALL_POST_SUMMARIES_SUCCESS', data: posts })
				}
			}).catch((err) => { console.log(err.stack) })
	}

	getResources() {
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