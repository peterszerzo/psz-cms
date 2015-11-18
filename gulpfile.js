var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	mocha = require('gulp-mocha');

// Server watch and live reload.
gulp.task('dev', function() {
	nodemon({
		script: './app.js',
		ext: 'js scss jade',
		tasks: function(changedFiles) {
			return [ 'style' ];
		}
	}).on('restart', function() { console.log('restarted'); });
})

// Run specs. 
gulp.task('spec', function() {
    return gulp.src('./spec/**/*_spec.js')
        .pipe(mocha({ reporter: 'spec' }));
})