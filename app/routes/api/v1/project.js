var express = require('express'),
	router = express.Router(),
	project = require('./../../../models/project.js');

var sanitizeQuery = function(query) {
	// Convert boolean queries.
	if (query.is_live != null) {
		if (query.is_live === 'true') { query.is_live = true; }
		if (query.is_live === 'false') { query.is_live = false; }
	}
	query.is_live = true;
};

router.get('/', function(req, res) {

	var query = req.query;

	sanitizeQuery(query);

	var coll = new project.Collection();

	var promise = coll.getFetchPromise(query);

	// setTimeout(() => {

	// 	promise.then((coll) => {
	// 	return res.json(coll.toJSON());
	// }, () => { return res.json([]); });

	// }, 10000);

	promise.then((coll) => {
		return res.json(coll.toJSON());
	}, () => { return res.json([]); });

});

module.exports = router;