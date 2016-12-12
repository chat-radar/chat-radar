import path = require('path');
import Express = require('express');
import Bluebird = require('bluebird');
import winston = require('winston');
import app = require('../lib/application');

// initialize application
app.init(require('../conf/server.conf'));

// setup logger
const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      humanReadableUnhandledException: true,
      level: app.get('logger console level'),
      colorize: true,
    }),
  ],
});

app.set('logger', logger);

// setup web server
const web = Express();

if (app.get('env') !== 'production') {
  const devMiddlewares = require('./dev-middlewares');
  web.use(devMiddlewares.webpackDevMiddleware);
  web.use(devMiddlewares.webpackHotMiddleware);
}

import * as middlewares from './middlewares';

web.use('/api', middlewares.parseServerMiddleware);
web.use('/dashboard', middlewares.basicAuthMiddleware, middlewares.parseDashboardMiddleware);
web.get('/', (_req, res: Express.Response) => res.sendFile(path.join(__dirname, '..', 'public', 'build', 'index.html')));
web.use(Express.static(path.join(__dirname, '..', 'public')));
web.get('*', (_req, res: Express.Response) => res.redirect('/'));

app.set('web', web);

app.boot().then(() => {
  (<any>Bluebird.promisifyAll(web)).listenAsync(app.get('web port'));
}).then(() => {
  logger.info('Server listening at %s', app.get('parse serverURL'));
}).catch((err) => {
  logger.error(err);
});
