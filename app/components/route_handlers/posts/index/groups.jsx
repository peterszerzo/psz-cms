import React from 'react'
import _ from 'underscore'

import List from './list.jsx'
import Loader from './../../../general/loader.jsx'

const GROUP_ORDER = [ 'featured', 'recent', 'nostalgia', 'technical', 'personal' ]


export default class Groups extends React.Component {

	render() {
		return (
			<div className='project-groups'>
				{ this.renderGroups() }
			</div>
		)
	}

	renderGroups() {

		var { resourceGroups } = this.props

		if (resourceGroups == null) { 
			return <Loader /> 
		}

		var keys = Object.keys(resourceGroups).sort((a, b) => (GROUP_ORDER.indexOf(a) - GROUP_ORDER.indexOf(b)))

		return keys.map((key, index) => {

			var resources = resourceGroups[key]
			
			if (!resources) { return null }

			return (
				<div className='project-group' key={index}>
					<div className='project-group__header'>
						<h1>{ key }</h1>
						<div className='project-group__separator' />
					</div>
					<div className='project-group__content'>
						<List resources={resources} />
					</div>
				</div>
			)
		})
	}

}