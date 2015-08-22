var base = require('./base.js'),
    marked = require('marked'),
    projects = {},
    fs = require('fs'),
    dbPath = __dirname + '/../../db/projects';



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

    getSetBodyPromise() {

        return new Promise((resolve, reject) => {

            if (this.isOnClient()) {

                resolve();

            } else {
                fs.readFile(`${dbPath}/show/${this.get('id')}.md`, 'utf-8', (err, data) => {
                    if (err) {
                        console.log(`Data file not found for project with id ${this.get('id')}.`);
                        data = '';
                    }
                    this.set('bodyText', data);
                    resolve();
                });
            }

        });

    }

}

class Collection extends base.Collection {

    constructor(options) {
        super(options);
        this.model = Model;
        this.baseUrl = '/api/v1/projects';
    }

    setUrl(query) {
        var queryString = '';
        queryString += query.id ? ('?id=' + query.id) : '';
        queryString += query.group ? ('?group=' + query.group) : '';
        this.url = this.baseUrl + queryString;
    }

    getFetchPromise(query, options) {

        var shouldGetRandom = false,
            randomModel,
            randomIndex,
            promise;

        console.dir(query);

        return new Promise((resolve, reject) => {

            // if on client, fetch using API url and resolve on reset.
            if (this.isOnClient()) {

                this.setUrl(query);
                this.fetch({ reset: true });
                this.on('reset', () => {
                    return resolve(this);
                });

            // if on server, retrieve from file system.
            } else {

                fs.readFile(`${dbPath}/index.json`, 'utf-8', (err, data) => {

                    var filteredCollection;

                    if (err) {
                        return reject(err);
                    }

                    data = JSON.parse(data);
                    this.reset(data);

                    if (query == null) {
                        return resolve(this);
                    }

                    if (query.id === 'random') {
                        delete query.id;
                        shouldGetRandom = true;
                    }

                    this.reset(this.where(query));

                    if (query.id == null && !shouldGetRandom) {
                        return resolve(this);
                    }

                    if (shouldGetRandom) {
                        this.resetToRandom();
                    }

                    promise = this.models[0].getSetBodyPromise();
                    promise.then(() => {
                        resolve(this);
                    });

                });
            }

        });

    }

}

module.exports = {
    Model: Model,
    Collection: Collection
}