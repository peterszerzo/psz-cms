import pg from 'pg'

export default function insert(options, req, res, next) {

	var { tableName } = options

	var data = req.body

	var keys = Object.keys(data)

	var keysString = keys.join(',')
	var valuesString = keys.map(key => data[key]).join(',')

	var command = `INSERT INTO ${tableName} (${keysString}) VALUES(${valuesString});`

	console.log(command)

	var { dbClient } = req

	dbClient.query(command, (err, data) => {
		if (err) {
			req.dbResponse = { status: 'error', serverError: err }
			return next()
		}
		req.dbResponse = { status: 'success' }
		return next()
	})

}