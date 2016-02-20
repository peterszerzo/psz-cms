import Base from './base.js'

import postFields from './post_fields.json'

// Inherit from base.
var Post = Object.create(Base)

Post.fields = postFields

Post.tableName = 'posts'

export default Post
