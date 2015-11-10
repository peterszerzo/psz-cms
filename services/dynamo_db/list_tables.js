var AWS = require('aws-sdk');

AWS.config.region = 'us-east-1';

var dynamoDb = new AWS.DynamoDB();

dynamoDb.listTables(function(err, data) {
	if (err) { return console.log(err); }
	console.log(data);
});