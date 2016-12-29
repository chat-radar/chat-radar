import http = require('http');
import Express = require('express');
import Bluebird = require('bluebird');
import winston = require('winston');
import app = require('../lib/application');
const { ParseServer } = require('parse-server');

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
const express = Express();
const httpServer = http.createServer(express);

if (app.get('env') !== 'production') {
  const devMiddlewares = require('./dev-middlewares');
  express.use(devMiddlewares.webpackDevMiddleware);
  express.use(devMiddlewares.webpackHotMiddleware);
}

import * as middlewares from './middlewares';

express.use('/api', middlewares.parseServerMiddleware);
express.use('/dashboard', middlewares.basicAuthMiddleware, middlewares.parseDashboardMiddleware);
express.use(middlewares.staticMiddleware);
express.get('*', (_req, res: Express.Response) => res.redirect('/'));

app.set('express', express);

app.boot().then(() => {
  (<any>Bluebird.promisify(httpServer.listen.bind(httpServer)))(app.get('httpServer port'));
}).then(() => {
  ParseServer.createLiveQueryServer(httpServer);
}).then(() => {
  logger.info('Server listening at %s', app.get('parse serverURL'));
}).catch((err) => {
  logger.error(err);
});
