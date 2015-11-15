require('babel-core/register')

var buildSeeds = require('./build_seeds.js').buildSeeds

buildSeeds({ collectionName: 'posts' }, function(err) { if (err) { return console.dir(err); } console.log('all good'); });