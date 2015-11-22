import React from 'react'
import { Link } from 'react-router'
import fetch from 'isomorphic-fetch'
import _ from 'underscore'

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
		var { resources } = this.state
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
	 * TODO: set through Redux action instead.
	 */
	componentDidMount() {

		fetch(`/api/v2/posts?type=${this.props.postType}&fields=(id,name,post_group)`)
			.then(res => res.json())
			.then((resources) => {
				this.setState({ resources })
			})

	}

}

export default Index