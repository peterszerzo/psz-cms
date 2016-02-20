import _ from 'underscore'
import pg from 'pg'

import * as models from './../../../cms/models/index.js'

export default function remove(options, req, res, next) {

	var { modelName } = options
	var Model = models[modelName]

	var data = req.body

	var { password } = data
	delete data.password

	var model = Model.create(data)

	var command = model.getSqlDeleteCommand()

	if (password !== process.env['PORCUPINE']) {
		req.dbResponse = { status: 'error', serverError: 'Invalid password.' }
		return next()
	}

	req.dbClient.query(command, (err, data) => {
		if (err) {
			console.log(err)
			req.dbResponse = { status: 'error', serverError: err }
			return next()
		}
		req.dbResponse = { status: 'success' }
		return next()
	})

}
