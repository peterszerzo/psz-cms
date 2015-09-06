require('babel/register');

var gulp = require('gulp'),
	babelify = require('babelify'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	nodemon = require('gulp-nodemon'),
	shell = require('gulp-shell'),
	uglify = require('gulp-uglify');

require('./gulp_tasks/style.js');
require('./gulp_tasks/spec.js');

gulp.task('default', [ 'style', 'script' ]);

// Does not work because of jquery.
gulp.task('bundle-client', function() {
	var b = browserify({ entries: [ './app/bundle.js' ] });
	b.transform(babelify.configure({ stage: 0 }));
	return b.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./app/assets/script'));
});

gulp.task('bundle-simple', shell.task([
	'browserify app/bundle.js -t babelify --outfile public/scripts/bundle.js --insert-globals --ignore fs'
]));

gulp.task('uglify-bundle', function() {
	gulp.src('./public/scripts/bundle.js')
		.pipe(uglify())
		.pipe(gulp.dest('./public/scripts'));
});

gulp.task('dev', function() {
	nodemon({
		script: './app.js',
		ext: 'js jsx scss jade',
		tasks: [ 'style', 'bundle-simple' ]
	}).on('restart', function() { console.log('restarted'); });
});

gulp.task('deploy', [  ]);