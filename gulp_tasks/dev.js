import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import './bundle.js';

gulp.task('dev', function() {
	gulp.start('bundle-watch');
	nodemon({
		script: './app.js',
		ext: 'js scss jade',
		tasks: function(changedFiles) {
			return [ 'style' ];
		}
	}).on('restart', function() { console.log('restarted'); });
});