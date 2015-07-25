var base = require('./base.js'),
	fs = require('fs'),
	marked = require('marked'),
	projects = {},
	dbPath = __dirname + '/../../db/projects';

class Model extends base.Model {

	getBody(next) {

		var id = this.get('id');

		fs.readFile(dbPath + `/show/${id}.md`, 'utf8', function(err, data) {
			if (err) { return cb(err, datum); }
			datum.bodyText = marked(data);
			next(null, datum);
		});

	}

}

class Collection extends base.Collection {

	fetchFromDb(options, next) {

		var self = this;

		fs.readFile(dbPath + '/index.json', (err, data) => {
			if (err) { return next(err, data); }
			if (data) { data = JSON.parse(data); }
			self.reset(data);
			next(err, self);
		});

	}

}

// looks for markdown if show action
var getMarkdown = function(err, datum, cb) {
	fs.readFile(dbPath + '/show/' + datum.id + '.md', 'utf8', function(err, data) {
		if (err) { console.log('md not found'); return cb(null, datum); }
		datum.bodyText = marked(data);
		cb(null, datum);
	});
};

var testByKey = function(datum, key, testValue) {
	var value = datum[key];
	if (value == null) { return false; }
	// Single value case.
	if (value.length == null) { return (value === testValue); }
	// Array case.
	return (value.indexOf(textValue) > -1);
};

var test = function(datum, query) {
	var value;
	for (key in query) {
		value = query[value];
		if (!testByKey(datum, key, value)) { return false; }
	}
	return true;
};

exports.get = function(query, cb) {

	query = query || {};

	fs.readFile(dbPath + '/index.json', function(err, data) {

		var i, max, datum;

		if (err) { return cb(err, data); }

		if (data) { data = JSON.parse(data); }

		if (query.id) {
			for (i = 0, max = data.length; i < max; i += 1) {
				datum = data[i];
				if (datum.id === query.id) {
					return getMarkdown(null, datum, cb);
				}
			}
			return [];
		}

		return cb(null, data);

	});

};

exports.Model = Model;
exports.Collection = Collection;