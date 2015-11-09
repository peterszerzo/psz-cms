import express from 'express';
import indexMiddleware from './../../../middleware/crud_dynamodb/index.js';

import _ from 'underscore';

var router = express.Router();

router.get('/projects', indexMiddleware.bind(this, { dbCollectionName: 'PszProjects', query: { is_live: true } }), function(req, res) {
	res.json(_.where(req.dbResponse));
});

router.get('/blog_posts', indexMiddleware.bind(this, { dbCollectionName: 'PszBlogPosts', query: { is_live: true } }), function(req, res) {
	res.json(_.where(req.dbResponse));
});

export default router;