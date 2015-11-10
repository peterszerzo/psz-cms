import post from './post.js';
import marked from 'marked';

/*
 *
 *
 */
class Model extends post.Model {

    get resourceName() { return 'project'; }

    get resourceUrlBase() { return 'projects'; }


    /*
     *
     *
     */
    getIconName() {
        var id = this.get('id'),
            name = id.split('-').map(function(word) {
                return (word[0].toUpperCase() + word.slice(1));
            }).join('');
        return name;
    }

}



/*
 *
 *
 */
class Collection extends post.Collection {

    get model() { return Model; }

    get dynamoDbTableOptions() { 

        return {
            TableName: 'PszProjects',

            AttributeDefinitions: [
                {
                    AttributeName: 'Id',
                    AttributeType: 'S'
                },
                {
                    AttributeName: 'Category',
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
                    AttributeName: 'Category',
                    KeyType: 'RANGE'
                }
            ]

        };

    }

}

export default {
    Model: Model,
    Collection: Collection
}