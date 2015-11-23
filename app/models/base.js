import _ from 'underscore'

/*
 * Escapes string to be inserted into a SQL database.
 *
 */
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
    })
}


/*
 * Base model.
 *
 */
var Base = {

	// Set on superclass.
	data: {},

	// Set on superclass.
	fields: [],


	/*
	 * 
	 *
	 */
	sanitizeValue(key, value) {

	},


	/*
	 *
	 *
	 */
	getCreateUrl() {
		return `/api/v2/${this.tableName}/`
	},


	/*
	 *
	 *
	 */
	getUpdateUrl() {
		return `/api/v2/${this.tableName}/${this.data.id}`
	},


	/*
	 *
	 *
	 */
	getDeleteUrl() {
		return this.getUpdateUrl()
	},


	/*
	 *
	 *
	 */
	create(data = {}) {
		var self = Object.create(this)
		self.data = data
		return self
	},


	/*
	 * For missing values, adds default.
	 *
	 */
	setDefaults() {
		var { fields, data } = this

		fields.forEach((field) => {
			var { defaultValue, key } = field
			if (data[key] == null && defaultValue != null) {
				data[key] = defaultValue
			}
		})
	},


	/*
	 *
	 *
	 */
	getValueAsString(key) {
		var value = this.data[key]
		if (_.isObject(value)) { return JSON.stringify(value) }
		return value
	},


	/*
	 *
	 *
	 */
	getValuesString() {

	    var { fields, data } = this

	    return fields.map((field) => {

	    	var { key, defaultValue } = field

	        var value = data[key]

	        if (value == null) { value = defaultValue }

	        if (_.isArray(value) || _.isObject(value)) { 
	            value = `'${JSON.stringify(value)}'`; 
	        } else if (_.isString(value)) {
	            let escapeMarker = ''
	            if (value.length > 15) { escapeMarker = 'E' }
	            value = `${escapeMarker}'${escapeText(value)}'`
	        }

	        return value

	    }).join(',')

	},


	/*
	 * Returns comma-separated list of field keys.
	 *
	 */
	getFieldKeysString() {
		return this.fields.map(field => field.key).join(',')
	},


	/*
	 * Returns comma-separated field key + type string.
	 *
	 */
	getFieldKeyTypesString() {
		return this.fields.map(field => `${field.key} ${field.type}`).join(',')
	},


	/*
	 * Returns command used to insert into sql database.
	 * @returns {string}
	 */
	getSqlInsertCommand() {
		return `INSERT INTO ${this.tableName} (${this.getFieldKeysString()}) VALUES(${this.getValuesString()});`
	},


	getSqlDeleteCommand() {
		return `DELETE FROM ${this.tableName} WHERE (id='${this.data.id}');`
	},


	/*
	 * Returns command used to create table.
	 * @returns {string}
	 */
	getTableCreateCommand() {
		return `CREATE TABLE ${this.tableName} (${this.getFieldKeyTypesString()});`;
	}

}

export default Base