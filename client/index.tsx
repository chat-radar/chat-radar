// initialize application
import * as app from '../lib/application';
app.init(require('../conf/client.conf'));

// imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Parse from 'parse';
import UIRouterReact from 'ui-router-react';
import * as moment from 'moment';
import 'moment/locale/ru';

// import styles
import '!style!css!../webpack-loaders/class-prefix-loader!postcss!sass!bootstrap/scss/bootstrap.scss';
import 'font-awesome/scss/font-awesome.scss';
import './styles';

// initialize logger
const logger = console;
app.set('logger', logger);

// initialize API
Parse.initialize(app.get('parse appId'));
(Parse as any).serverURL = app.get('parse serverURL');

// initialize stores
import { CityStore, ChatStore, PersonStore } from './stores';

const cityStore = new CityStore();
const chatStore = new ChatStore();
const personStore = new PersonStore();
const stores = { cityStore, chatStore, personStore };
app.set('stores', stores);

// setup routes
const router = new UIRouterReact();
app.set('router', router);

import { Root } from './components/root';
import { MapContainer } from './containers/map-container';
import { CitiesListContainer } from './containers/cities-list-container';
import { CityInfoContainer } from './containers/city-info-container';

router.stateRegistry.register({
  name: 'root',
  abstract: true,
  views: {
    background: MapContainer,
  },
});

router.stateRegistry.register({
  name: 'root.cities',
  url: '/',
  views: {
    '@': CitiesListContainer,
  },
});

router.stateRegistry.register({
  name: 'root.city',
  url: '/:cityId',
  views: {
    '@': CityInfoContainer,
  },
  resolve: [{
    token: 'city',
    deps: ['$transition$'],
    resolveFn: (trans) => {
      cityStore.selectCityById(trans.params().cityId);
    },
  }],
});

router.urlRouterProvider.otherwise('/');

router.start();

// initialize moment
moment.locale('ru');

ReactDOM.render(<Root {...stores} />, document.getElementById('root'));
