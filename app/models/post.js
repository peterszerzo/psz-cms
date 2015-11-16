import * as Backbone from 'backbone';

/*
 * Sets url property, building up query string from json.
 *
 */
export class Model extends Backbone.Model {

    /*
     *
     *
     */
    get defaults() {
        return {
            display_order: 0,
            is_live: false,
            supervisors: [],
            headline: '',
            title: '',
            name: 'Untitled',
            collaborators: [],
            links: [],
            post_group: '',
            dates: [],
            technologies: [],
            body_text: 'A fine body text.'
        };
    }


    /*
     *
     *
     */
    get dbFields() {
        return [
            {
                key: 'id',
                type: 'text'
            },
            {
                key: 'type',
                type: 'text'
            },
            {
                key: 'title',
                type: 'text'
            },
            {
                key: 'headline',
                type: 'text'
            },
            {
                key: 'name',
                type: 'text'
            }, 
            {
                key: 'supervisors',
                type: 'json'
            },
            {
                key: 'collaborators',
                type: 'json'
            },
            {
                key: 'post_group',
                type: 'text'
            },
            {
                key: 'technologies',
                type: 'json'
            },
            {
                key: 'body_text',
                type: 'text'
            },
            {
                key: 'display_order',
                type: 'integer',
            },
            {
                key: 'dates',
                type: 'json'
            },
            {
                key: 'links',
                type: 'json'
            },
            {
                key: 'is_live',
                type: 'boolean'
            }
        ];
    }


    /*
     *
     *
     */
    get dbIndeces() {
        return [
            {
                key: 'id',
                type: 'unique'
            },
            {
                key: 'type'
            }
        ];
    }

}



/*
 * Sets url property, building up query string from json.
 *
 */
export class Collection extends Backbone.Collection {

    /*
     * Reference to the model constructor.
     *
     */
    get model() { return Model; }

}