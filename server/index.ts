/// <reference path='../typings/index.d.ts' />

import path = require('path');
import Express = require('express');
import Bluebird = require('bluebird');
import logger = require('winston');
import app = require('../lib/application');

// Initialize application
app.init(require('../conf/server.conf'));

import middlewares = require('./middlewares');

// Setup logger
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  handleExceptions: true,
  humanReadableUnhandledException: true,
  level: app.get('logger console level'),
  colorize: true,
});

// Setup web server
const web = Express();

web.use(middlewares.webpackDevMiddleware);
web.use(middlewares.webpackHotMiddleware);
web.use('/api', middlewares.parseServerMiddleware);
web.use(Express.static(path.join(__dirname, '../public')));

app.set('logger', logger);
app.set('web', web);

app.boot().then(() => {
  (<any>Bluebird.promisifyAll(web)).listenAsync(app.get('web port'));
}).then(() => {
  logger.info('Server listening at %s', app.get('parse serverURL'));
}).catch((err) => {
  logger.error(err)
});
