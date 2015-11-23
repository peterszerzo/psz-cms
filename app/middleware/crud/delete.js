import _ from 'underscore';
import pg from 'pg';

export default function delete(options, req, res, next) {
	
	var { modelName } = options

	var data = req.body

	var model = models[modelName].create(data)

	var command = model.getSqlDeleteCommand()

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