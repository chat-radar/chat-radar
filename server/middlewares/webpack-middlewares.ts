import webpack = require('webpack');
import app = require('../../lib/application');
const config = require('../../conf/webpack.conf.js');
const compiler = webpack(config);

export const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
  log: app.get('logger').debug,
  noInfo: true,
  quiet: true,
  hot: true,
  publicPath: config.output.publicPath,
});

export const webpackHotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: app.get('logger').debug,
  noInfo: true,
  reload: true,
});
