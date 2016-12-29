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
import 'bootstrap/scss/bootstrap.scss';
import './styles';

// import files
import '!!file?name=robots.txt!./robots.txt';

// initialize logger
const logger = console;
app.set('logger', logger);

// initialize API
Parse.initialize(app.get('parse appId'));
(Parse as any).serverURL = app.get('parse serverURL');

// initialize stores
import { CityStore, ChatStore, PersonStore } from './stores';

const chatStore = new ChatStore();
const personStore = new PersonStore();
const cityStore = new CityStore(personStore, chatStore);
const stores = { cityStore, chatStore, personStore };
app.set('stores', stores);

// setup routes
const router = new UIRouterReact();
app.set('router', router);

import { Root } from './components/root';
import { MapContainer } from './containers/map-container';
import { ChatsListContainer } from './containers/chats-list-container';
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
  name: 'chats',
  parent: 'root',
  url: '/',
  views: {
    '@': ChatsListContainer,
  },
  resolve: [{
    token: 'chats',
    resolveFn: () => {
      chatStore.selectChatById(null);
      cityStore.selectCityById(null);
    },
  }],
});

router.stateRegistry.register({
  name: 'chats.cities',
  url: '^/:chatId',
  views: {
    '@': CitiesListContainer,
  },
  resolve: [{
    token: 'chats.cities',
    deps: ['$transition$'],
    resolveFn: (trans) => {
      chatStore.selectChatById(trans.params().chatId);
      cityStore.selectCityById(null);
    },
  }],
});

router.stateRegistry.register({
  name: 'chats.cities.city',
  url: '/:cityId',
  views: {
    '@': CityInfoContainer,
  },
  resolve: [{
    token: 'chats.cities.city',
    deps: ['$transition$'],
    resolveFn: (trans) => {
      cityStore.selectCityById(trans.params().cityId);
    },
  }],
});

router.urlRouterProvider.otherwise('/');

// initialize analytics
try {
  const ga = require('ga');

  if (!process.env.GA_ID)
    throw new Error('Google Analitycs ID not defined');

  ga('create', process.env.GA_ID, 'auto');

  router.transitionService.onSuccess({}, () => {
    const url = router.stateService.href(router.stateService.current, router.stateService.params).substring(1);
    ga('set', 'page', url);
    ga('send', 'pageview');
  });
} catch (err) {
  logger.error(err.toString());
}

// initialize moment
moment.locale('ru');

// here we go!
router.start();
ReactDOM.render(<Root {...stores} />, document.getElementById('root'));
