const gulp = require('gulp');
const HubRegistry = require('gulp-hub');

const conf = require('./conf/gulp.conf');

// Load some files into the registry
const hub = new HubRegistry([conf.path.tasks('*.js')]);

// Tell gulp to use the tasks just loaded
gulp.registry(hub);

gulp.task('build', gulp.series('webpack'));
gulp.task('build:production', gulp.series('clean', 'webpack:production'));
gulp.task('default', gulp.series('clean', 'build'));
