import React from 'react'

import Index from './../../resources/index/root.jsx'

var groupDescriptions = {
	'personal': 'Thoughts, stories, the occasional low-key rambling.',
	'technical': 'Tricks I learn while dabbling with technology.'
}

// Higher-order component
function BlogPostsIndex(props) {

	return (
		<Index 
			{ ...props }
			activeLinkName={'blog'}
			postType={'blog_post'}
			resourceName={'blog_post'} 
			groupDescriptions={groupDescriptions} 
		/>
	)
	
}

export default BlogPostsIndex