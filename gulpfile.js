var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var addSrc = require('gulp-add-src');
var nodemon = require('gulp-nodemon');

var source = {
	vendor: [ 
		'bower_components/jquery/dist/jquery.js', 
		'bower_components/d3/d3.js'
	],
	lib: [ 'assets/script/app.js' ]
};

gulp.task('style', function() {
	gulp.src('assets/style/style.scss')
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

gulp.task('dev', function() {
	nodemon({
		script: './app.js',
		ext: 'js scss jade',
		tasks: [ 'style', 'script' ]
	}).on('restart', function() { console.log('restarted'); });
});