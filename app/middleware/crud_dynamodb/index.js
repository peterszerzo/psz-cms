// Middleware reading a database collection.
// Handles queries, field selections etc.

import _ from 'underscore';
import fs from 'fs';

import AWS from 'aws-sdk';
import DOC from 'dynamodb-doc';

AWS.config.update({ region: 'us-east-1' });

var docClient = new DOC.DynamoDB();

var params = {
	TableName: 'PszProjects'
};

var indexMiddleware = (options, req, res, next) => {

	var id = req.params.id;

	var query = req.query || {},
		queryFields,
		fields = {},
		shouldReturnRandom = false;

	if (options.query) {
		for (let key in options.query) {
			query[key] = options.query[key];
		}
	}

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

	if (query.random) {
		shouldReturnRandom = true;
		delete query.random;

	}

	console.log(query, fields);

	docClient.scan({ TableName: options.dbCollectionName }, (err, dynamoDbResponse) => {

		var data = dynamoDbResponse.Items;

		if (err) { req.dbResponse = []; console.dir(err); return next(); }

		// data = JSON.parse(data);

		// data = _.where(data, query);

		if (queryFields) {

			data.forEach((datum) => {

				for (let field in fields) {
					if (fields[field] === 0) {
						delete datum[field];
					}
				}

			});

		}

		if (shouldReturnRandom) {
			let randomIndex = Math.floor(Math.random() * data.length);
			data = [ data[ randomIndex ] ];
		}

		req.dbResponse = data;

		return next();

	});

};

export default indexMiddleware;