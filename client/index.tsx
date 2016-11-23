/// <reference path='../typings/index.d.ts' />

// first of all initialize application
import * as app from '../lib/application';
app.init(require('../conf/client.conf'));

// imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Map } from './containers/map';
import store from './store';

// require styles
import 'leaflet/dist/leaflet.css';
import './styles';

// initialize logger
const logger = window.console;
app.set('logger', logger);

// set up React and Redux
ReactDOM.render(
  <Provider store={store}>
    {React.createElement(Map)}
  </Provider>,
  document.getElementById('root'),
);

app.set('store', store);
