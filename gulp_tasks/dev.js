import gulp from 'gulp';
import nodemon from 'gulp-nodemon';

gulp.task('dev', function() {
	nodemon({
		script: './app.js',
		ext: 'js scss jade',
		tasks: function(changedFiles) {
			return [ 'style' ];
		}
	}).on('restart', function() { console.log('restarted'); });
});