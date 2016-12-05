require('dotenv').config({ silent: true });

const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
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
          'postcss',
          'sass',
        ],
      },
      // {
      //   test: /\.(css|scss)$/,
      //   loaders: ExtractTextPlugin.extract({
      //     fallbackLoader: 'style',
      //     loader: 'css?minimize!postcss!sass',
      //   }),
      // },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: [
          'babel?presets[]=es2015',
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
      template: conf.path.src('index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.PARSE_SERVER_URL': JSON.stringify(process.env['PARSE_SERVER_URL']),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {unused: true, dead_code: true, warnings: false}, // eslint-disable-line camelcase
    }),
    new ExtractTextPlugin('chat-radar-[contenthash].css'),
  ],
  postcss: () => [autoprefixer],
  output: {
    path: path.join(process.cwd(), conf.paths.dist),
    publicPath: '/build/',
    filename: 'chat-radar-[hash].js',
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
    `./${conf.path.src('index')}`,
  ],
  tslint: {
    configuration: require('../tslint.json'),
  },
};
