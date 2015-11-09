import base from './base.js';
import marked from 'marked';

/*
 *
 *
 */
class Model extends base.Model {

    get resourceName() { return 'blog_post'; }

    get resourceUrlBase() { return 'blog'; }


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
class Collection extends base.Collection {

    get model() { return Model; }

    get dynamoDbTableOptions() { 

        return {

            TableName: 'PszBlogPosts',

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
        }; 
    }

}

export default {
    Model: Model,
    Collection: Collection
}