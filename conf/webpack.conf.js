require('dotenv').config({ silent: true });

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
        test: /\.json$/,
        loaders: [
          'json',
        ],
      },
      {
        test: /\.(css|scss)$/,
        loaders: 'style!css!postcss!sass',
        exclude: /bootstrap\.scss$/,
      },
      {
        test: /bootstrap\.scss$/,
        loaders: 'style!css!postcss!./webpack-loaders/class-prefix-loader!sass',
      },
      {
        test: /\.tsx?$/,
        loaders: [
          'ts',
        ],
      },
      {
        test: /\.(png|jpe?g|eot|woff2?|ttf|svg)$/,
        loaders: [
          'file',
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: conf.path.src('index.ejs'),
      title: 'Chat Radar',
      favicon: conf.path.src('favicon.ico'),
      ga: false,
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
  externals: {
    ga: 'ga',
  },
  ts: {
    silent: true,
  },
  tslint: {
    configuration: require('../tslint.json'),
  },
};
