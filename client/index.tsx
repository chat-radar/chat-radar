/// <reference path='../typings/index.d.ts' />

import React = require('react');
import ReactDOM = require('react-dom');
import app = require('../lib/application');
const logger = console;

// Initialize application
app.init(require('../conf/client.conf'));

import Test = require('./components/test');

// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import {Router, Route, browserHistory} from 'react-router';

// import {Main} from './app/main';

import './styles';

app.set('logger', logger);

ReactDOM.render(<Test />, document.getElementById('root'));

// ReactDOM.render(
//   <Router history={browserHistory}>
//     <Route path='/' component={Main}/>
//   </Router>,
//   document.getElementById('root')
// );
