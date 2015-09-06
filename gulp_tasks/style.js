import gulp from 'gulp';
import sass from 'gulp-sass';

gulp.task('style', function() {
	gulp.src('app/assets/style/style.scss')
		.pipe(sass('site.css').on('error', sass.logError))
		.pipe(gulp.dest('./public/styles/'));
});