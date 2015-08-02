var express = require('express'),
	router = express.Router(),
	project = require('./../../../models/project.js'),
	fs = require('fs');

// Function used in the router's get definitions.
// Also used to retrieve data for server-side rendering.
router.callOnServer = function(req, next) {

	var query = req.query,
		getRandom = false;

	// Convert boolean queries.
	if (query.is_live != null) {
		if (query.is_live === 'true') { query.is_live = true; }
		if (query.is_live === 'false') { query.is_live = false; }
		if (query.id === 'random') { 
			delete query.id;
			getRandom = true;
		}
	}

	fs.readFile('./db/projects/index.json', 'utf8', function(err, data) {

		if(err) { return next(err); }

		// Convert to Backbone collection to do querying.
		var coll = new project.Collection(JSON.parse(data)),
			matchingModels = coll.where(query), 
			json,
			randomIndex = Math.floor(Math.random() * matchingModels.length);

		if (getRandom === true) {
			matchingModels = [ matchingModels[ randomIndex ] ];
		}

		json = matchingModels.map(function(model) {
			return model.toJSON();
		});

		console.log(json);

		// Add body text if needed.
		if (json.length === 1) {

			fs.readFile(`./db/projects/show/${json[0].id}.md`, 'utf8', function(err, data) {
				if(err) { return next(err, json); }
				json[0].bodyText = data;
				return next(null, json);
			});

		} else { return next(null, json); }
		
	});

}

router.get('/', function(req, res) {

	router.callOnServer(req, function(err, json) {
		res.json(json);
	});

});

module.exports = router;