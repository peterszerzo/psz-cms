require('babel/register');

var AWS = require('aws-sdk');

AWS.config.region = 'us-east-1';

var base = require('./../../app/models/base.js');

var dynamoDb = new AWS.DynamoDB();

var coll = new base.Collection();

var params = coll.dynamoDbTableOptions

dynamoDb.createTable(params, function(err, table) {
	if (err) { console.log('there was an error creating the table'); return console.log(err); }
	console.log(table);
});