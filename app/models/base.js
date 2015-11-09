import $ from 'jquery';
import * as Backbone from 'backbone';
import * as fs from 'fs';
import Inflect from 'inflect';


/*
 * Sets url property, building up query string from json.
 *
 */
class Model extends Backbone.Model {

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

}



/*
 * Sets url property, building up query string from json.
 *
 */
class Collection extends Backbone.Collection {

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