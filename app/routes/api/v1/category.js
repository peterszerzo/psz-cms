var express = require('express'),
	router = express.Router(),
	category = require('./../../../models/category.js'),
	fs = require('fs');

router.get('/', function(req, res) {

	var query = req.query;

	var coll = new category.Collection();

	var promise = coll.getFetchPromise(query);

	promise.then((coll) => {
		return res.json(coll.toJSON());
	});

});

module.exports = router;