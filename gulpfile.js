var gulp = require('gulp'),
	concat = require('gulp-concat'),
	babel = require('gulp-babel'),
	babelify = require('babelify'),
	sass = require('gulp-sass'),
	addSrc = require('gulp-add-src'),
	browserify = require('browserify'),
	reactify = require('reactify'),
	source = require('vinyl-source-stream'),
	nodemon = require('gulp-nodemon');

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

gulp.task('script', function() {
	gulp.src(source.lib)
		.pipe(babel())
		.pipe(addSrc.prepend(source.vendor))
		.pipe(concat('site.js'))
		.pipe(gulp.dest('./public/scripts/'))
});

gulp.task('default', [ 'style', 'script' ]);

gulp.task('bundle', function() {
	return browserify([ './app/bundle.js' ])
		.transform(babelify)
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./app/assets/script'));
});

gulp.task('dev', function() {
	nodemon({
		script: './app.js',
		ext: 'js jsx scss jade',
		tasks: [ 'style', 'script' ]
	}).on('restart', function() { console.log('restarted'); });
});