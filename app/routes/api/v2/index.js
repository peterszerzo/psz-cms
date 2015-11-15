import express from 'express'
import _ from 'underscore'

import { list } from './../../../middleware/crud_postgres/index.js'

var router = express.Router()

router.get('/posts', list.bind(this, { tableName: 'posts', query: { is_live: true } }), function(req, res) {
	res.json(req.dbResponse)
})

export default router