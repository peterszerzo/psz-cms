import React from 'react'

import Index from './../../resources/index/root.jsx'

var groupDescriptions = {
	'featured': 'Things on my mind these days. An incomplete collection.',
	'recent': 'A blend of mostly finished technical and creative endeavors.',
	'nostalgia': 'The childhood project(s) that got me started.',
	'personal': 'Thoughts, stories, the occasional low-key rambling.',
	'technical': 'Tricks I learn while dabbling with technology.'
}

// Higher-order component
function ProjectsIndex(props) {

	return (
		<Index 
			{ ...props }
			activeLinkName={'projects'}
			postType={'project'}
			groupDescriptions={groupDescriptions} 
		/>
	)

}

export default ProjectsIndex