import React from 'react'

import Index from './../../resources/index/root.jsx'

import project from './../../../../models/project.js'

var groupDescriptions = {
	'featured': 'Things on my mind these days. An incomplete collection.',
	'recent': 'A blend of mostly finished technical and creative endeavors.',
	'nostalgia': 'The childhood project(s) that got me started.'
}

// Higher-order component
class ProjectsIndex extends React.Component {

	render() {
		return (
			<Index 
				{ ...this.props }
				resourceConstructors={project} 
				groupDescriptions={groupDescriptions} 
			/>
		)
	}
	
}

export default ProjectsIndex