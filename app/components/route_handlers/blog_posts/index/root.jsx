import Index from './../../resources/index/root.jsx';

import blogPost from './../../../../models/blog_post.js';

class BlogPostsIndex extends Index {

	getResourceConstructors() {
		return blogPost;
	}

}

export default BlogPostsIndex;