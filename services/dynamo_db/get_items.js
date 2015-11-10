var AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

var DOC = require("dynamodb-doc");

var docClient = new DOC.DynamoDB();

var queryParams = {
	TableName: 'PszPosts',
	KeyConditionExpression: ':typekey=:typevalue',
	ExpressionAttributeValues: {
		':typekey': 'Id',
		':typevalue': 'ripsaw-js'
	}
};

var scanParams = {
	TableName: 'PszPosts',
	FilterExpression: ':typekey=:typevalue',
	ExpressionAttributeValues: {
		':typekey': 'Type',
		':typevalue': 'project'
	}
};

docClient.scan(scanParams, function(err, data) {
	if(err) { return console.log(err); }
	console.log(data);
});