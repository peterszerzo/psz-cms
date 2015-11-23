import pg from 'pg'
import * as models from './../../models/index.js'

export default function insert(options, req, res, next) {

	var { modelName } = options

	var data = req.body

	var model = models[modelName].create(data)

	var command = model.getSqlInsertCommand()

	console.log(command)

	var { dbClient } = req

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