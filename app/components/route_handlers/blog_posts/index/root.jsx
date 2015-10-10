import Index from './../../resources/index/root.jsx';

import blogPost from './../../../../models/blog_post.js';

class BlogPostsIndex extends Index {

	/*
	 *
	 *
	 */
	getResourceConstructors() {
		return blogPost;
	}


	/*
	 *
	 *
	 */
	getGroupDescriptions() {
		return {
			'personal': 'Thoughts, stories, the occasional low-key rambling.',
			'technical': 'A rather incomplete collection of things I learn while dabbling with technology.'
		};
	}

}

export default BlogPostsIndex;