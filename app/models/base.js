var _ = require('underscore'),
	Backbone = require('backbone');

class Model extends Backbone.Model {

}

class Collection extends Backbone.Collection {

	constructor(options) {

		super(options);
		this.model = Model;

	}

}

module.exports = {
	Model: Model,
	Collection: Collection
}