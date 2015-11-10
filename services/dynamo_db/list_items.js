var AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

var DOC = require("dynamodb-doc");

var docClient = new DOC.DynamoDB();

var params = {
	TableName: 'PszProjects'
};

docClient.scan(params, function(err, data) {
	if(err) { return console.log(err); }
	console.log(data.Items);
});