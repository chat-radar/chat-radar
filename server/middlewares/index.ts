import parseServerMiddleware = require('./parse-server-middleware');
import { webpackDevMiddleware, webpackHotMiddleware } from './webpack-middlewares';

export = {
  parseServerMiddleware,
  webpackDevMiddleware,
  webpackHotMiddleware,
}
