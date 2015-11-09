var AWS = require('aws-sdk');

AWS.config.region = 'us-east-1';

var dynamoDb = new AWS.DynamoDB();

var projectLikeTables = [ 'PszProjects', 'PszBlogPosts' ];

/*
 * Get table definitions for project like tables.
 *
 */
var getProjectLikeParams = function() {

	return {

		AttributeDefinitions: [
			{
				AttributeName: 'Id',
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
			}
		]

	}

};

var params = getProjectLikeParams();
params.TableName = projectLikeTables[0];

dynamoDb.createTable(params, function(err, table) {

	if (err) { console.log('there was an error creating the table'); return console.log(err); }
	console.log('success');
	console.log(table);
});