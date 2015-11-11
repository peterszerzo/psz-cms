import React from 'react'

import Index from './../../resources/index/root.jsx'
import blogPost from './../../../../models/blog_post.js'

var groupDescriptions = {
	'personal': 'Thoughts, stories, the occasional low-key rambling.',
	'technical': 'Tricks I learn while dabbling with technology.'
}

// Higher-order component
class BlogPostsIndex extends React.Component {

	render() {
		return (
			<Index 
				{ ...this.props }
				resourceConstructors={blogPost} 
				groupDescriptions={groupDescriptions} 
			/>
		)
	}
	
}

export default BlogPostsIndex