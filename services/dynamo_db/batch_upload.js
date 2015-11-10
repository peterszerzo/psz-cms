require('babel/register');

var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
var DOC = require("dynamodb-doc");

var docClient = new DOC.DynamoDB();

var Collection = require('./../../app/models/base.js').Collection;

var collectionData = require('./../../content/seeds/posts.json');

var coll = new Collection(collectionData);

var storableData = coll.toCamelizedJson();

storableData.forEach(function(datum) {

	var params = {
		TableName: coll.dynamoDbTableOptions.TableName,
		Item: datum
	}

	docClient.putItem(params, function(err) {
		if (err) { return console.log(err); }
		console.log('success');
	});

});