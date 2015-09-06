import gulp from 'gulp';
import mocha from 'gulp-mocha';

gulp.task('spec', function() {
    return gulp.src('./spec/**/*_spec.js')
        .pipe(mocha({ reporter: 'spec' }));
});