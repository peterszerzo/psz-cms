import express from 'express';
import indexMiddleware from './../../../middleware/crud/index.js';

import _ from 'underscore';

var router = express.Router();

router.get('/projects', indexMiddleware.bind(this, { dbCollectionName: 'projects' }), function(req, res) {
	res.json(_.where(req.dbResponse, { is_live: true }));
});

router.get('/blog_posts', indexMiddleware.bind(this, { dbCollectionName: 'blog_posts' }), function(req, res) {
	res.json(_.where(req.dbResponse, { is_live: true }));
});

module.exports = router;