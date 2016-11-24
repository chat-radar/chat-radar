/// <reference path='../typings/index.d.ts' />

// initialize application
import app = require('../lib/application');
app.init(require('../conf/client.conf'));

// imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Parse from 'parse';
import { MapContainer } from './containers/map-container';
import { PersonStore, CityStore } from './stores';

// import styles
import 'leaflet/dist/leaflet.css';
import './styles';

// initialize logger
const logger = console;
app.set('logger', logger);

// initialize API
Parse.initialize(app.get('parse appId'));
(Parse as any).serverURL = app.get('parse serverURL');

// initialize stores
const personStore = new PersonStore();
const cityStore = new CityStore();
const stores = { personStore, cityStore };
app.set('stores', stores);

ReactDOM.render(<MapContainer stores={stores} />, document.getElementById('root'));
