import post from './post.js';
import marked from 'marked';

/*
 *
 *
 */
class Model extends post.Model {

    get resourceName() { return 'blog_post'; }

    get resourceUrlBase() { return 'blog'; }

}


/*
 *
 *
 */
class Collection extends post.Collection {

    get model() { return Model; }

}

export default {
    Model: Model,
    Collection: Collection
}