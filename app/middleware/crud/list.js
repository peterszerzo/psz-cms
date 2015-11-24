import 'babel-polyfill'

import _ from 'underscore'
import pg from 'pg'

export default function list(options, req, res, next) {

	var { tableName, query } = options

	query = query || {}

	var columnSelector = '*'

	// Clone the query passed to the middleware.
	var masterQuery = _.clone(query)
	
	// Add query parameters from request to the ones coming from the middleware options.
	for (let key in req.query) {
		masterQuery[key] = req.query[key]
	}

	// If there is a fields query, set the column selector and remove field key from the query
	var { fields } = masterQuery

	if (fields) {
		fields = fields.slice(1, -1)
		columnSelector = fields
		delete masterQuery.fields
	}

	// Build WHERE string
	var whereString = (query && _.isObject(query)) ? Object.keys(masterQuery).map((key) => {
		var val = masterQuery[key]
		val = `'${val}'` 
		return `${key}=${val}`
	}).join(' AND ') : null

	whereString = whereString ? `WHERE ${whereString}` : ''

	// Build command
	var command = `SELECT ${columnSelector} FROM ${tableName} ${whereString};`

	req.dbClient.query(command, (err, data) => {

		if (err) { 
			console.log(err)
			req.dbResponse = { message: 'no turkeys' }
			return next()
		}

		req.dbResponse = data.rows
		return next()

	})

}