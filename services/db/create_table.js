var AWS = require('aws-sdk');

AWS.config.region = 'us-east-1';

var dynamoDb = new AWS.DynamoDB();


var params = {
	TableName: 'test',
	AttributeDefinitions: [
		{
			AttributeName: 'Id',
			AttributeType: 'S'
		},
		{
			AttributeName: 'Name',
			AttributeType: 'S'
		}
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 1,
		WriteCapacityUnits: 1
	},
	KeySchema: [
		{
			AttributeName: 'Id',
			KeyType: 'HASH'
		},
		{
			AttributeName: 'Name',
			KeyType: 'RANGE'
		}
	]
};



dynamoDb.createTable(params, function(err, table) {
	if (err) { console.log('there was an error creating the table'); return console.log(err); }
	console.log('success');
	console.log(table);
});