import pg from 'pg'
import * as models from './../../../cms/models/index.js'

export default function insert(options, req, res, next) {

	var { modelName } = options

	var data = req.body

	var { password } = data
	delete data.password

	var model = models[modelName].create(data)

	var command = model.getSqlInsertCommand()

	var { dbClient } = req

	if (password !== process.env['PORCUPINE']) {
		req.dbResponse = { status: 'error', serverError: err }
		return next()
	}

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
