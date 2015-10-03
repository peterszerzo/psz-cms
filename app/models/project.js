import base from './base.js';
import marked from 'marked';
import fs from 'fs';

var dbPath = __dirname + '/../../db/projects';

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

    getIconName() {
        var id = this.get('id'),
            name = id.split('-').map(function(word) {
                return (word[0].toUpperCase() + word.slice(1));
            }).join('');
        return name;
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

    get model() { return Model; }
    get baseUrl() { return '/api/v1/projects'; }

    getFetchPromise(query, options) {

        var shouldGetRandom = false,
            randomModel,
            randomIndex,
            promise;

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