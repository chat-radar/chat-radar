const gulp = require('gulp');
const gutil = require('gulp-util');

const webpack = require('webpack');
const webpackConf = require('../conf/webpack.conf');
const webpackDistConf = require('../conf/webpack-dist.conf');
const gulpConf = require('../conf/gulp.conf');

gulp.task('webpack', done => {
  webpackWrapper(webpackConf, done);
});

gulp.task('webpack:production', done => {
  webpackWrapper(webpackDistConf, done);
});

function webpackWrapper(conf, done) {
  const webpackBundler = webpack(conf);

  const webpackChangeHandler = (err, stats) => {
    if (err) {
      gulpConf.errorHandler('Webpack')(err);
    }
    gutil.log(stats.toString({
      colors: true,
      chunks: false,
      hash: false,
      version: false,
    }));
    if (done) {
      done();
      done = null;
    }
  };

  webpackBundler.run(webpackChangeHandler);
}
