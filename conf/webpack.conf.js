const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    preLoaders: [
      {
        test: /\.tsx?$/,
        loader: 'tslint',
      },
    ],
    loaders: [
      {
        test: /.json$/,
        loaders: [
          'json',
        ],
      },
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style',
          'css',
          'sass',
          'postcss',
        ],
      },
      {
        test: /\.tsx?$/,
        loaders: [
          'ts-loader',
        ],
      },
      {
        test: /\.(png|jpe?g)$/,
        loaders: [
          'url-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: conf.path.src('index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  postcss: () => [autoprefixer],
  debug: true,
  devtool: 'source-map',
  output: {
    path: path.join(process.cwd(), conf.paths.dist),
    publicPath: '/',
    filename: 'chat-radar.js',
  },
  resolve: {
    extensions: [
      '',
      '.webpack.js',
      '.web.js',
      '.ts',
      '.tsx',
      '.js',
      '.scss',
      '.css',
    ],
  },
  entry: [
    'webpack-hot-middleware/client',
    `./${conf.path.src('index')}`,
  ],
  tslint: {
    configuration: require('../tslint.json'),
  },
};
