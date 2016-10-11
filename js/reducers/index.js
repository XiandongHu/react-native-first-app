/**
 * @flow
 */

'use strict';

var { combineReducers } = require('redux');

module.exports = combineReducers({
  about: require('./about'),
  user: require('./user'),
  games: require('./games'),
  allPlayers: require('./allPlayers'),
  navigation: require('./navigation'),
});
