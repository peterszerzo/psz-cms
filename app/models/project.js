var fs = require('fs'),
	marked = require('marked'),
	projects = {},
	dbPath = __dirname + '/../../db/projects';

// looks for markdown if show action
var getMarkdown = function(err, project, cb) {
	fs.readFile(dbPath + '/show/' + project.id + '.md', 'utf8', function(err, data) {
		if (err) { cb(null, project); return; }
		project.bodyText = marked(data);
		cb(null, project);
	});
};

exports.request = function(id, cb) {
	fs.readFile(dbPath + '/index.json', function(err, data) {
		var i, max, datum;
		if (err) { cb(err, data); return; }
		if (data) { data = JSON.parse(data); }
		if (!id) { 
			cb(null, data);
			return;
		} else {
			for (i = 0, max = data.length; i < max; i += 1) {
				datum = data[i];
				if (datum.id === id) {
					getMarkdown(null, datum, cb);
					return;
				}
			}
		}
	});
};