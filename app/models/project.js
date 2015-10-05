import base from './base.js';
import marked from 'marked';

/*
 *
 *
 */
class Model extends base.Model {

    get resourceName() { return 'project'; }

    get resourceUrlBase() { return 'projects'; }

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

}

export default {
    Model: Model,
    Collection: Collection
}