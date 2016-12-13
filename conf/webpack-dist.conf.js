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
        loaders: ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: 'css?minimize!postcss!sass',
        }),
        exclude: /bootstrap\.scss$/,
      },
      {
        test: /bootstrap\.scss$/,
        loaders: ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: 'css?minimize!postcss!./webpack-loaders/class-prefix-loader!sass',
        }),
      },
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
    new ExtractTextPlugin('chat-radar-[contenthash].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.PARSE_SERVER_URL': JSON.stringify('http://chat-radar.roland.black/api'),
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor-[hash].js' }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { unused: true, dead_code: true, warnings: false }, // eslint-disable-line camelcase
    }),
  ],
  postcss: () => [autoprefixer],
  output: {
    path: path.join(process.cwd(), conf.paths.dist),
    publicPath: '/',
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
  entry: {
    'chat-radar': `./${conf.path.src('index')}`,
    'vendor': [
      'classnames',
      'leaflet',
      'mobx',
      'mobx-react',
      'moment',
      'react',
      'react-dom',
      'react-leaflet',
      'ui-router-core',
      'ui-router-react',
    ],
  },
  tslint: {
    configuration: require('../tslint.json'),
  },
};
