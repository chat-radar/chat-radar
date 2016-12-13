import parseServerMiddleware = require('./parse-server-middleware');
import parseDashboardMiddleware = require('./parse-dashboard-middleware');
import basicAuthMiddleware from './basic-auth-middleware';
import staticMiddleware from './static-middleware';

export {
  parseServerMiddleware,
  parseDashboardMiddleware,
  basicAuthMiddleware,
  staticMiddleware,
};
