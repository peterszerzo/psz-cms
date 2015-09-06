require('babel/register');

var path = require('path'),
	gulp = require('gulp');

require('./gulp_tasks/style.js');
require('./gulp_tasks/spec.js');
require('./gulp_tasks/bundle.js');
require('./gulp_tasks/dev.js');

gulp.task('default', [ 'style', 'bundle' ]);