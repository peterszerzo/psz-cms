import _ from 'underscore'
import pg from 'pg'

export default function show(options, req, res, next) {
	req.dbResponse = []
	next()
}
