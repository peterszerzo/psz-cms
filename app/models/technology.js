var _ = require('underscore'),
	Backbone = require('backbone'),
	base = require('./base.js');

class Model extends base.Model {

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