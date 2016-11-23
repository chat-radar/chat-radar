/// <reference path='../typings/index.d.ts' />

import * as React from 'react';
import ReactDOM = require('react-dom');
import app = require('../lib/application');
const logger = console;

// initialize application
app.init(require('../conf/client.conf'));

import Root = require('./components/root');

import 'leaflet/dist/leaflet.css';
import './styles';

app.set('logger', logger);

ReactDOM.render(<Root />, document.getElementById('root'));
