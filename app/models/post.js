import $ from 'jquery';
import * as Backbone from 'backbone';
import Inflect from 'inflect';

import * as base from './base.js';


/*
 * Sets url property, building up query string from json.
 *
 */
export class Model extends base.Model {

    /*
     * 
     *
     */
    get resourceName() { return 'base'; }


    /*
     * Word fragment used to build up data url.
     *
     */
    get resourceUrlBase() { return 'bases'; }


    /*
     * Url under which the resource is displayed on the client-side app.
     *
     */
    get viewUrl() {
        return `/${this.resourceUrlBase}/${this.get('id')}`;
    }


    /*
     * Return JSON representation with camel-cased field names.
     *
     */
    toCamelizedJson() {
        var data = this.toJSON();
        for (let key in data) {
            let newKey = Inflect.camelize(key);
            if (newKey !== key) {
                data[newKey] = data[key];
                delete data[key];
            }
        }
        return data;
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
export class Collection extends base.Collection {

    /*
     * Reference to the model constructor.
     *
     */
    get model() { return Model; }

}