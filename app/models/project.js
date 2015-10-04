import base from './base.js';
import marked from 'marked';

/*
 *
 *
 */
class Model extends base.Model {

    /*
     *
     *
     */
    fetch(...args) {
        // if on client
        if (isOnClient()) {
            super.fetch(...args);
        }
    }


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
    get baseUrl() { return '/api/v1/projects'; }


    /*
     *
     *
     */
    getFetchPromise(query, options) {

        return new Promise((resolve, reject) => {

            this.setUrl(query);
            this.fetch({ reset: true });
            
            this.on('reset', () => {
                return resolve(this);
            });

       });

    }

}

export default {
    Model: Model,
    Collection: Collection
}