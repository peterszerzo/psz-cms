import express from 'express'

import { insert, list, remove } from './../../../middleware/crud/index.js'

var router = express.Router()

router.get('/posts', list.bind(this, { modelName: 'Post', tableName: 'posts', query: { is_live: true } }), function(req, res) {
	res.json(req.dbResponse)
})

router.post('/posts', insert.bind(this, { modelName: 'Post', tableName: 'posts' }), function(req, res) {
	res.json(req.dbResponse)
})

router.delete('/posts/:id', remove.bind(this, { modelName: 'Post', tableName: 'posts' }), function(req, res) {
	res.json(req.dbResponse)
})

export default router