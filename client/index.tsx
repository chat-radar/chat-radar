// initialize application
import app = require('../lib/application');
app.init(require('../conf/client.conf'));

// imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Parse from 'parse';
import UIRouterReact from 'ui-router-react';
import { CityStore, ChatStore, PersonStore } from './stores';
import { Root } from './components/root';
import { MapContainer } from './containers/map-container';

// import styles
import '!style!css!../webpack-loaders/class-prefix-loader!postcss!sass!bootstrap/scss/bootstrap.scss';
import './styles';

// initialize logger
const logger = console;
app.set('logger', logger);

// initialize API
Parse.initialize(app.get('parse appId'));
(Parse as any).serverURL = app.get('parse serverURL');

// initialize stores
const cityStore = new CityStore();
const chatStore = new ChatStore();
const personStore = new PersonStore();
const stores = { cityStore, chatStore, personStore };
app.set('stores', stores);

// setup routes
const router = new UIRouterReact();

router.stateRegistry.register({
  name: 'index',
  url: '/',
  views: {
    background: MapContainer,
  },
});

router.html5Mode(true);

router.start();

ReactDOM.render(<Root {...stores} />, document.getElementById('root'));
