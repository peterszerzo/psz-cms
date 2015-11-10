import _ from 'underscore';
import pg from 'pg';

export default function list(options, req, res, next) {

	var { tableName, query, fields } = options;

	var whereString = (query && _.isObject(query)) ? Object.keys(query).map((key) => {
		return `${key}='${query[key]}'`;
	}).join(' ') : null;

	whereString = whereString ? (' WHERE ' + whereString) : '';

	req.dbClient.query(`SELECT * FROM ${tableName}${whereString};`, (err, data) => {

		if (err) { 
			console.log(err); 
			req.dbResponse = { message: 'no turkeys' };
			return next();
		}

		req.dbResponse = data.rows;
		return next();

	});

};