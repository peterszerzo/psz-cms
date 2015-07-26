var base = require('./base.js'),
	fs = require('fs'),
	marked = require('marked'),
	projects = {},
	dbPath = __dirname + '/../../db/projects';

class Model extends base.Model {

	getShowUrl() {
		return `/show/${this.get('id')}.md`;
	}

	getBodyText(next) {

		fs.readFile(dbPath + this.getShowUrl(), 'utf8', (err, bodyText) => {
			if (err) { console.log('md not found'); return next(); }
			this.set('bodyText', bodyText);
			next(null, this);
		});

	}

}

class Collection extends base.Collection {

	constructor(options) {

		super(options);
		this.model = Model;

	}

	fetchFromDb(query, next) {

		var self = this;

		fs.readFile(dbPath + '/index.json', (err, data) => {
			if (err) { return next(err, data); }
			if (data) { data = JSON.parse(data); }
			self.reset(data);
			self.reset(self.where(query));
			if (query.id != null) {
				self.models[0].getBodyText(function(err, model) {
					next(err, self);
				});
			} else {
				next(err, self);
			}
		});

	}

}

module.exports = {
	Model: Model,
	Collection: Collection
}