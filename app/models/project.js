var base = require('./base.js'),
	marked = require('marked'),
	projects = {},
	dbPath = __dirname + '/../../db/projects';

class Model extends base.Model {

	getShowUrl() {
		return `/show/${this.get('id')}.md`;
	}

}

class Collection extends base.Collection {

	constructor(options) {

		super(options);
		this.model = Model;

	}

}

module.exports = {
	Model: Model,
	Collection: Collection
}