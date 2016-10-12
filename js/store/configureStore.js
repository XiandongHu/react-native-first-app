/**
 * @flow
 */

'use strict';

import { applyMiddleware, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';

var { AsyncStorage } = require('react-native');
var createLogger = require('redux-logger');

var promise = require('./promise');
var array = require('./array');
var reducers = require('../reducers');

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

var logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

var createNBAStore = applyMiddleware(thunk, promise, array, logger)(createStore);

function configureStore(onComplete: ?() => void) {
  // TODO: reconsider usage of redux-persist, maybe add cache breaker
  const store = autoRehydrate()(createNBAStore)(reducers);
  persistStore(store, {storage: AsyncStorage}, onComplete);
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}

module.exports = configureStore;
