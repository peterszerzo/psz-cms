var AWS = require('aws-sdk');

AWS.config.region = 'us-east-1';

var dynamoDb = new AWS.DynamoDB();

var params = {
	TableName: 'test'
};

dynamoDb.deleteTable(params, function(err) {
	if (err) { console.log('there was an error creating the table'); return console.log(err); }
	console.log('success');
});