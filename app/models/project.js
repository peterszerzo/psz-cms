var fs = require('fs'),
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

exports.request = function(id, cb) {
	fs.readFile(dbPath + '/index.json', function(err, data) {
		var i, max, datum;
		if (err) { return cb(err, data); }
		if (data) { data = JSON.parse(data); }
		if (!id) { 
			return cb(null, data);
		} else {
			for (i = 0, max = data.length; i < max; i += 1) {
				datum = data[i];
				if (datum.id === id) {
					return getMarkdown(null, datum, cb);
				}
			}
		}
	});
};