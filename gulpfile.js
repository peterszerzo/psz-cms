var gulp = require('gulp'),
	babelify = require('babelify'),
	sass = require('gulp-sass'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	nodemon = require('gulp-nodemon'),
	shell = require('gulp-shell'),
	uglify = require('gulp-uglify');

var source = {

	vendor: [ 
		'bower_components/jquery/dist/jquery.js', 
		'bower_components/d3/d3.js',
		'bower_components/page/page.js'
	],

	lib: [ 
		'app/assets/script/init.js',
		'app/assets/script/routes.js',
		'app/assets/script/globe.js',
		'app/assets/script/geojson_generator.js'
	]

};

gulp.task('style', function() {
	gulp.src('app/assets/style/style.scss')
		.pipe(sass('site.css').on('error', sass.logError))
		.pipe(gulp.dest('./public/styles/'));
});

gulp.task('default', [ 'style', 'script' ]);

gulp.task('bundle-client', function() {
	var b = browserify({ entries: [ './app/test_bundle.js' ] });
	b.transform(babelify);
	return b.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./app/assets/script'));
});

gulp.task('bundle-simple', shell.task([
	'browserify app/bundle.js -t babelify --outfile public/scripts/bundle.js --insert-globals'
]));

gulp.task('dev', function() {
	nodemon({
		script: './app.js',
		ext: 'js jsx scss jade',
		tasks: [ 'style', 'bundle-simple' ]
	}).on('restart', function() { console.log('restarted'); });
});