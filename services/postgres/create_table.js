/*
 *
 * CREATE TABLE posts (id string, type string, links json)
 * CREATE INDEX ON posts
 *
 *
 */


require('babel-core/register')

var fs = require('fs')
var Post = require('./../../app/models/post.js').default

var postData = require('./../../content/seeds/posts.json')

var insertScripts = postData.map(function(postDatum) {
	var post = Post.create(postDatum)
	return post.getSqlInsertCommand()
}).join('\n')

var post = Post.create()

var createScript = post.getTableCreateCommand()

fs.writeFile('./services/postgres/create.sql', createScript)
fs.writeFile('./services/postgres/insert.sql', insertScripts)