import express from 'express'

import { insert, list } from './../../../middleware/crud/index.js'

var router = express.Router()

router.get('/posts', list.bind(this, { tableName: 'posts', query: { is_live: true } }), function(req, res) {
	res.json(req.dbResponse)
})

router.post('/posts', insert.bind(this, { tableName: 'posts' }), function(req, res) {
	res.json(req.dbResponse)
})

export default router