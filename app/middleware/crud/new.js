import _ from 'underscore';
import pg from 'pg';

export default function new(options, req, res, next) {

	req.dbResponse = [];

	next();

};