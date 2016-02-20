import * as express from 'express'

import apiRouter from './api/v2/index.js'

var router = express.Router()

router.use('/api/v2', apiRouter)

router.get('*', (req, res) => {
	res.render('layout.jade')
})

export default router
