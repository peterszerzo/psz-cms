import 'babel-polyfill'

import _ from 'underscore'
import pg from 'pg'

import * as models from './../../models/index.js'

export default function remove(options, req, res, next) {
	
	var { modelName } = options

	var Model = models[modelName]

	var data = req.body

	console.log(Model)

	var model = Model.create(data)

	var command = model.getSqlDeleteCommand()

	var { dbClient } = req

	console.log(command)

	dbClient.query(command, (err, data) => {
		if (err) {
			console.log(err)
			req.dbResponse = { status: 'error', serverError: err }
			return next()
		}
		req.dbResponse = { status: 'success' }
		return next()
	})

}