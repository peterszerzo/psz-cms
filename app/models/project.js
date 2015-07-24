var _ = require('underscore'),
	Backbone = require('backbone'),
	fs = require('fs'),
	marked = require('marked'),
	projects = {},
	dbPath = __dirname + '/../../db/projects';

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

var filter = function(data, query) {
	var i, max, datum,
		filteredData = [];
	for(i = 0, max = data.length; i < max; i += 1) {
		datum = data[i];
		if (test(datum, query)) {
			filteredData.push(datum);
		}
	}
	return filteredData;
};

var filterByCategory = function(data, category) {
	var i, max, datum,
		filteredData = [];
	for(i = 0, max = data.length; i < max; i += 1) {
		datum = data[i];
		if (datum.categories && (datum.categories.indexOf(category) > -1)) {
			filteredData.push(datum);
		}
	}
	return filteredData;
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

		if (query.category) { data = filterByCategory(data, query.category); }

		//data = filter(data, query);

		return cb(null, data);

	});

};