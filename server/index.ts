/// <reference path='../typings/index.d.ts' />

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
import middlewares = require('./middlewares');

const web = Express();

web.use(middlewares.webpackDevMiddleware);
web.use(middlewares.webpackHotMiddleware);
web.use('/api', middlewares.parseServerMiddleware);
web.use(Express.static(path.join(__dirname, '..', 'public')));

app.set('web', web);

app.boot().then(() => {
  (<any>Bluebird.promisifyAll(web)).listenAsync(app.get('web port'));
}).then(() => {
  logger.info('Server listening at %s', app.get('parse serverURL'));
}).catch((err) => {
  logger.error(err);
});
