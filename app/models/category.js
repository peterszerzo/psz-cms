var _ = require('underscore'),
	Backbone = require('backbone'),
	base = require('./base.js'),
	fs = require('fs'),
	dbPath = __dirname + '/../../db/categories';



class Model extends base.Model {

}

class Collection extends base.Collection {

	constructor(options) {

		super(options);
		this.model = Model;
		this.baseUrl = '/api/v1/categories';

	}

	getFetchPromise() {

		return new Promise((resolve, reject) => {

			if (this.isOnClient()) {

				this.setUrl(query);
                this.fetch();
                this.on('reset', () => {
                    return resolve(this);
                });

			} else {

				fs.readFile(`${dbPath}/index.json`, (err, data) => {

					if (err) { return reject(err); }

					data = JSON.parse(data);

					this.reset(data);

					return resolve(this);

				});

			}

		});

	}

}

module.exports = {
	Model: Model,
	Collection: Collection
}