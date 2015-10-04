// Middleware reading a database collection.
// Handles queries, field selections etc.

import _ from 'underscore';
import fs from 'fs';

var indexMiddleware = (options, req, res, next) => {

	var id = req.params.id;

	var query = req.query || {},
		queryFields,
		fields = {};

	// If there is a fields query parameter, parse into MongoDB fields object and remove from query.
	if (query.fields) {

		queryFields = query.fields;
		delete query.fields;

		queryFields.split(',').forEach((fld) => {
			if (fld.slice(0, 1) === '-') {
				fields[fld.slice(1)] = 0;
			} else {
				fields[fld] = 1;
			}
		});

	}

	fs.readFile(`${__dirname}/../../../db/seeds/${options.dbCollectionName}.json`, (err, data) => {

		if (err) { req.dbResponse = []; console.dir(err); return next(); }

		data = JSON.parse(data);

		data = _.where(data, query);

		if (queryFields) {

			data.forEach((datum) => {

				for (let field in fields) {
					if (fields[field] === 0) {
						console.log(field);
						delete datum[field];
					}
				}

			});

		}

		req.dbResponse = data;

		return next();

	});

};

export default indexMiddleware;