import _ from 'underscore'

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
	setDefaults() {
		var { fields, data } = this

		console.log(this, data, fields)

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
	getValuesString() {

	    var { fields, data } = this

	    return fields.map((field) => {

	    	var { key, defaultValue } = field

	        var value = data[key]

	        if (value == null) { value = defaultValue }

	        if (_.isArray(value) || _.isObject(value)) { 
	            value = `'${JSON.stringify(value)}'`; 
	        } else if (_.isString(value)) {
	            let escapeMarker = '';
	            if (value.length > 50) { escapeMarker = 'E'; }
	            value = `${escapeMarker}'${escapeText(value)}'`;
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
	 *
	 *
	 */
	getSqlInsertCommand() {
		return `INSERT INTO ${this.tableName} (${this.getFieldKeysString()}) VALUES(${this.getValuesString()});`
	},


	/*
	 *
	 *
	 */
	getTableCreateCommand() {
		return `CREATE TABLE ${this.tableName} (${this.getFieldKeyTypesString()});`;
	}

}

export default Base