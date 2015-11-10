import _ from 'underscore';
import pg from 'pg';

export default function delete(options, req, res, next) {
	req.dbResponse = [];
	next();
};