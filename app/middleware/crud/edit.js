import _ from 'underscore';
import pg from 'pg';

export default function edit(options, req, res, next) {

	req.dbResponse = [];

	next();

};