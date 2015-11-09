require('babel/register');

var AWS = require('aws-sdk');

AWS.config.region = 'us-east-1';

var dynamoDb = new AWS.DynamoDB();

var DOC = require("dynamodb-doc");

var docClient = new DOC.DynamoDB();

var Collection = require('./../../app/models/project.js').Collection;

var collectionData = require('./../../db/seeds/projects.json');

var coll = new Collection(collectionData);

var storableData = coll.toCamelizedJson(),
	datum = storableData[0];

var params = {
	TableName: coll.dynamoDbTableOptions.TableName,
	Item: datum
}

docClient.putItem(params, function(err) {
	if (err) { return console.log(err); }
	console.log('success');
});