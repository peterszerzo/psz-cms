require('babel-core/register');

var gulp = require('gulp');

require('./gulp_tasks/style.js');
require('./gulp_tasks/spec.js');
require('./gulp_tasks/dev.js');
require('./gulp_tasks/deploy.js');