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

	tableName: 'testresources',

	// Set on subclass.
	data: {},

	// Set on subclass.
	fields: [],


	/*
	 * Create model instance.
	 *
	 */
	create(data = {}) {
		var self = Object.create(this)
		self.setDefaults()
		// Add new data on top of defaults.
		self.data = Object.assign({}, self.data, data)
		return self
	},


	/*
	 * Get API url to create new resource.
	 *
	 */
	getCreateUrl() {
		return `/api/v2/${this.tableName}/`
	},


	/*
	 * Get API url to update the resource.
	 *
	 */
	getUpdateUrl() {
		return `/api/v2/${this.tableName}/${this.data.id}`
	},


	/*
	 * Get API url to delete the resource.
	 *
	 */
	getDeleteUrl() {
		return this.getUpdateUrl()
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
	getAttributeForFormField(field) {
		var value = this.data[field.key]
		if (_.isObject(value)) { return JSON.stringify(value) }
		return value
	},


	/*
	 *
	 *
	 */
	getAttributeForSqlInsert(field) {
		var { key } = field
		var value = this.data[field.key]
		if (_.isArray(value) || _.isObject(value)) {
	        value = `'${JSON.stringify(value)}'`;
	    } else if (_.isString(value)) {
	        let escapeMarker = ''
	        if (value.length > 15) { escapeMarker = 'E' }
	        value = `${escapeMarker}'${escapeText(value)}'`
	    }
	    return value
	},


	/*
	 * Gets value string for SQL insert.
	 *
	 */
	getValuesString() {
	    return this.fields.map(field => this.getAttributeForSqlInsert(field)).join(',')
	},


	/*
	 *
	 *
	 */
	getSetString() {
		return this.fields.map(field => `${field.key}=${this.getAttributeForSqlInsert(field)}`)
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


	/*
	 * Returns set keys.
	 *
	 */
	getSqlUpdateCommand() {
		return `UPDATE ${this.tableName} SET (${this.getSetString()}) WHERE (id='${this.data.id}');`;
	},


	/*
	 *
	 *
	 */
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