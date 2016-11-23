/// <reference path='../typings/index.d.ts' />

import app = require('../lib/application');

// initialize application
app.init(require('../conf/client.conf'));

import * as React from 'react';
import ReactDOM = require('react-dom');
const logger = console;
import { MapContainer } from './containers/map-container';

import 'leaflet/dist/leaflet.css';
import './styles';

app.set('logger', logger);

ReactDOM.render(<MapContainer />, document.getElementById('root'));
