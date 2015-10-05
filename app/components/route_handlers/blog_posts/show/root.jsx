import Show from './../../resources/show/root.jsx';

import blogPost from './../../../../models/blog_post.js';

class BlogPostsShow extends Show {

	getResourceConstructors() {
		return blogPost;
	}

}

export default BlogPostsShow;