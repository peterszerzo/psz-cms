import $ from 'jquery';
import * as Backbone from 'backbone';
import * as fs from 'fs';


/*
 * Sets url property, building up query string from json.
 *
 */
class Model extends Backbone.Model {

}



/*
 * Sets url property, building up query string from json.
 *
 */
class Collection extends Backbone.Collection {

    get model() { return Model; }


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
        this.url = this.baseUrl + queryString;
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