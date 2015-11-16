import express from 'express'

import { list } from './../../../middleware/crud/index.js'

var router = express.Router()

router.get('/posts', list.bind(this, { tableName: 'posts', query: { is_live: true } }), function(req, res) {
	res.json(req.dbResponse)
})

export default router