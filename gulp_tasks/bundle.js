import gulp from 'gulp';
import _ from 'underscore';
import babelify from 'babelify';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import nodemon from 'gulp-nodemon';
import shell from 'gulp-shell';
import uglify from 'gulp-uglify';
import util from 'gulp-util';

var browserifyArgs = {
    entries: [ './app/bundle.js' ],
	ignore: 'fs'
};

var getBrowserifyBundler = () => {
    var args = _.extend(browserifyArgs, watchify.args, { debug: true });
    var b = browserify(args);
    return b.transform(babelify.configure({ stage: 0 }));
};

var getWatchifyBundler = () => {
    return watchify(getBrowserifyBundler());
};

var writeBundle = (bundler) => {
	return bundler.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./public/scripts'))
		.pipe(!!util.env.production ? uglify() : util.noop())
		.pipe(gulp.dest('./public/scripts'));
};

// Does not work because of jquery.
gulp.task('bundle', function() {
	return writeBundle(getBrowserifyBundler());
});

gulp.task('bundle-uglify', () => {
	return gulp.src('./public/scripts/bundle.js')
		.pipe(!!util.env.production ? uglify() : util.noop())
		.pipe(gulp.dest('./public/scripts'));
});

gulp.task('bundle-watch', () => {
	var bundler = getWatchifyBundler();
	bundler.on('update', () => {
		console.log('rebundling');
		return writeBundle(bundler);
	});
	return writeBundle(bundler);

});