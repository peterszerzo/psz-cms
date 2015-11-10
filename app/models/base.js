import Backbone from 'backbone';
import _ from 'underscore';

/*
 * Sets url property, building up query string from json.
 *
 */
class Model extends Backbone.Model {

    /*
     *
     *
     */
    getInsertScript() {

    }


    /*
     *
     *
     */
    getFieldsString() {
        return this.dbFields.map((field) => {
            return `${field.key}`;
        }).join(',');
    }


    /*
     *
     *
     */
    getFieldTypesString() {
        return this.dbFields.map((field) => {
            return `${field.key} ${field.type}`;
        }).join(',');
    }


    /*
     *
     *
     */
    getValuesString() {
        return this.dbFields.map((field) => {
            var value = this.get(field.key);
            if (_.isArray(value) || _.isObject(value)) { value = JSON.stringify(value); }
            if (_.isString(value)) {
                value = `'${value}'`;
            }
            return value;
        }).join(',');
    }


    /*
     * 
     *
     */
    getCreateTableScript() {
        return `CREATE TABLE posts (${this.getFieldTypesString()});`;
    }


    /*
     *
     *
     */
    getInsertIntoTableScript() {
        return `INSERT INTO posts (${this.getFieldsString()}) VALUES(${this.getValuesString()});`
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
     *
     *
     */
    getInsertScripts() {

    }

}



export default {
	Model: Model,
	Collection: Collection
}