/// <reference path='../typings/index.d.ts' />

import Express = require('express');
const { ParseServer } = require('parse-server');
import Bluebird = require('bluebird');
import app = require('../lib/application');
import config = require('../conf/server.conf');

// Initialize application
app.init(config);

// Setup web server
const web = Express();

// Setup Parse server
const parse = new ParseServer({
  databaseURI: app.get('parse databaseURI'),
  appId: app.get('parse appId'),
  masterKey: app.get('parse masterKey'),
  serverURL: app.get('parse serverURL'),
});

web.use('/api', parse);

app.set('web', web);
app.set('parse', parse);

app.boot().then(() => {
  (<any>Bluebird.promisifyAll(web)).listenAsync(app.get('web port'));
}).then(() => {
  console.log('Server listening at %s', app.get('parse serverURL'));
});
