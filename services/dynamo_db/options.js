    /*
     *
     *
     */
    dynamoDbTableOptions = function() {

        return {

            TableName: 'PszPosts',

            AttributeDefinitions: [{
                AttributeName: 'Id',
                AttributeType: 'S'
            }, {
                AttributeName: 'Type',
                AttributeType: 'S'
            }],

            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 2
            },

            KeySchema: [{
                AttributeName: 'Id',
                KeyType: 'HASH'
            }, {
                AttributeName: 'Type',
                KeyType: 'RANGE'
            }]

        };
    };