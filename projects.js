var fs = require('fs'),
	projects = {};

exports.request = function(id, cb) {
	fs.readFile(__dirname + '/public/data/projects.json', function(err, data) {
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
					cb(null, datum);
					return;
				}
			}
		}
	});
};