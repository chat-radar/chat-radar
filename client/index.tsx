// initialize application
import app = require('../lib/application');
app.init(require('../conf/client.conf'));

// imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Parse from 'parse';
import { MapContainer } from './containers/map-container';
import { SidePanelContainer } from './containers/side-panel-container';
import { CityStore, ChatStore } from './stores';

// import styles
import './styles';

// initialize logger
const logger = console;
app.set('logger', logger);

// initialize API
Parse.initialize(app.get('parse appId'));
(Parse as any).serverURL = app.get('parse serverURL');

// initialize stores
// const personStore = new PersonStore();
const cityStore = new CityStore();
const chatStore = new ChatStore();
const stores = { cityStore, chatStore };
app.set('stores', stores);

ReactDOM.render(
  (
    <div>
      <MapContainer stores={stores} />
      <SidePanelContainer stores={stores} />
    </div>
  ),
  document.getElementById('root'),
);
