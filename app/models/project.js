var base = require('./base.js'),
    marked = require('marked'),
    projects = {},
    fs = require('fs'),
    dbPath = __dirname + '/../../db/projects';

var isOnClient = function() {
    return (fs == null || fs.readFile == null);
};

class Model extends base.Model {

    getShowUrl() {
        return `/show/${this.get('id')}.md`;
    }

    fetch(...args) {
        // if on client
        if (isOnClient()) {
            super.fetch(...args);
        }
    }

    setBody() {
        if (isOnClient()) {

        } else {
            fs.readFile(`${dbPath}/show/${this.get('id')}.md`, 'utf-8', (err, data) => {
                if (err) {
                    console.dir(err);
                    data = '';
                }
                this.set('bodyText', data);
            });
        }

    }

}

class Collection extends base.Collection {

    constructor(options) {

        super(options);
        this.model = Model;
        this.url = '/api/v1/projects';

    }

    resetToRandom() {
        var randomIndex, randomModel;
        randomIndex = Math.floor(Math.random() * this.models.length);
        randomModel = this.models[randomIndex];
        this.reset([randomModel]);
    }

    fetch(query, options) {

        var shouldGetRandom = false,
            randomModel,
            randomIndex;

        // if on client
        if (isOnClient()) {

            super.fetch(query, options);

        } else {

            fs.readFile(`${dbPath}/index.json`, 'utf-8', (err, data) => {

                var filteredCollection;
                if (err) {
                    return console.dir(err);
                }

                data = JSON.parse(data);
                this.reset(data);

                if (query == null) {
                    return this.trigger('fetched');
                }

                if (query.id === 'random') {
                    delete query.id;
                    shouldGetRandom = true;
                }

                this.reset(this.where(query));

                if (query.id == null && !shouldGetRandom) {
                	return this.trigger('fetched');
                }

                if (shouldGetRandom) {
                    this.resetToRandom();
                }

                this.models[0].setBody();
                this.models[0].on('change', () => {
                    this.trigger('fetched')
                });

            });
        }
    }

}

module.exports = {
    Model: Model,
    Collection: Collection
}