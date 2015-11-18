import * as express from 'express'
import * as Router from 'react-router'
import * as React from 'react'

var router = express.Router()

router.use('/api/v2', require('./api/v2/index.js').default)

router.get('*', (req, res) => {
	res.render('layout.jade', { reactOutput: '<p></p>' })
})

export default router