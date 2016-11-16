import webpack = require('webpack');
const config = require('../../conf/webpack.conf.js');
const compiler = webpack(config);

export const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
});

export const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);
