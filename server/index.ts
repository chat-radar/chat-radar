/// <reference path='../typings/index.d.ts' />

// import Express = require('express');
import app = require('../lib/application');
import config = require('../conf/server');

app.init(config);

console.log(app.get('web port'));
