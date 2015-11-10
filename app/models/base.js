import Backbone from 'backbone';
import _ from 'underscore';

function escapeText(val) {
    if (typeof val != 'string')
    return val;
    return val.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
};


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
            if (_.isArray(value) || _.isObject(value)) { 
                value = `'${JSON.stringify(value)}'`; 
            } else if (_.isString(value)) {
                let escapeMarker = '';
                if (value.length > 50) { escapeMarker = 'E'; }
                value = `${escapeMarker}'${escapeText(value)}'`;
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