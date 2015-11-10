import express from 'express';
import { list } from './../../../middleware/crud_postgres/index.js';

import _ from 'underscore';

var router = express.Router();

router.get('/posts', list.bind(this, { tableName: 'posts', query: null, fields: {} }), function(req, res) {
	res.json(req.dbResponse);
});

export default router;