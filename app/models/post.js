import $ from 'jquery';
import * as Backbone from 'backbone';
import Inflect from 'inflect';

import base from './base.js';


/*
 * Sets url property, building up query string from json.
 *
 */
class Model extends base.Model {

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
            post_group: 'featured',
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
class Collection extends base.Collection {

    /*
     * Reference to the model constructor.
     *
     */
    get model() { return Model; }


    /*
     * Replace fields with underscored versions.
     *
     */
    parse(data) {
        for (let key in data) {
            let newKey = Inflect.underscore(key);
            if (newKey !== key) {
                data[newKey] = data[key];
                delete data[key];
            }
        }
        return data;
    }


    /*
     * Use model's toCamelizedJson method to build up a corresponding JSON array.
     *
     */
    toCamelizedJson() {
        return this.models.map((model) => {
            return model.toCamelizedJson();
        });
    }


    /*
     * 
     *
     */
    get dbCollection() { 
        var name = this.model.prototype.resourceName;
        return `${name}s`; 
    }


    /*
     *
     *
     */
    get apiUrl() {
        var name = this.model.prototype.resourceName;
        return `/api/v1/${name}s`; 
    }


    /*
     * Sets url property, building up query string from json.
     *
     */
	setUrl(query) {
        var queryString = '?', key, value;
        for (key in query) {
            value = query[key];
            queryString += `${key}=${value}&`;
        }
        this.url = this.apiUrl + queryString;
    }


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


    /*
     * Reset collection to a include only one of its current models, picked at random.
     */
    resetToRandom() {
        var randomIndex, randomModel;
        randomIndex = Math.floor(Math.random() * this.models.length);
        randomModel = this.models[randomIndex];
        this.reset([randomModel]);
    }

}


export default {
	Model: Model,
	Collection: Collection
}