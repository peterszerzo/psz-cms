import * as express from 'express'
import * as Router from 'react-router'
import * as React from 'react'

import { createLocation } from 'history'

import apiRouter from './api/v2/index.js'

var router = express.Router()

router.use('/api/v2', apiRouter)

router.get('*', (req, res) => {
	// console.log(createLocation(req.url))
	res.render('layout.jade', { reactOutput: '<p></p>' })
})

export default router