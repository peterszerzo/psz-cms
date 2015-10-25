var AWS = require('aws-sdk');

AWS.config.region = 'us-east-1';

var dynamoDb = new AWS.DynamoDB();

