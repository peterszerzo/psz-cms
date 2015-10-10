import express from 'express';
import indexMiddleware from './../../../middleware/crud/index.js';

import _ from 'underscore';

var router = express.Router();

router.get('/projects', indexMiddleware.bind(this, { dbCollectionName: 'projects', query: { is_live: true } }), function(req, res) {
	res.json(_.where(req.dbResponse));
});

router.get('/blog_posts', indexMiddleware.bind(this, { dbCollectionName: 'blog_posts', query: { is_live: true } }), function(req, res) {
	res.json(_.where(req.dbResponse));
});

module.exports = router;