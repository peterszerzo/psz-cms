require('babel-core/register');

var fs = require('fs');

var createScript = 'CREATE TABLE posts (id string, type string, links json)';

var createIndexScript = 'CREATE INDEX ON posts ';

var post = require('./../../app/models/post.js');

var postData = require('./../../content/seeds/posts.json');

console.log(postData)

var coll = new post.Collection(postData);

var insertScripts = coll.models.map(function(model) { return model.getInsertIntoTableScript(); }).join('\n');

var createScripts = coll.models[0].getCreateTableScript();

fs.writeFile('./services/postgres/create.sql', createScripts);

fs.writeFile('./services/postgres/insert.sql', insertScripts);