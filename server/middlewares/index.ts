import parseServerMiddleware = require('./parse-server-middleware');
import parseDashboardMiddleware = require('./parse-dashboard-middleware');
import { webpackDevMiddleware, webpackHotMiddleware } from './webpack-middlewares';

export = {
  parseServerMiddleware,
  parseDashboardMiddleware,
  webpackDevMiddleware,
  webpackHotMiddleware,
};
