import gulp from 'gulp';
import shell from 'gulp-shell';

gulp.task('deploy', shell.task([
	'gulp --production',
	'git add -A',
	'git commit -m "fresh deploy"',
	'git push origin master',
	'git push heroku master'
]));