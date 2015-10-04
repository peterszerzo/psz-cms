import gulp from 'gulp';
import sass from 'gulp-sass';
import minifyCss from 'gulp-minify-css';
import util from 'gulp-util';

gulp.task('style', function() {
	gulp.src('app/assets/styles/site.scss')
		.pipe(sass('site.css').on('error', sass.logError))
		.pipe(!!util.env.production ? minifyCss() : util.noop())
		.pipe(gulp.dest('./public/styles/'));
});