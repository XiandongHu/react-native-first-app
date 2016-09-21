/**
 * @flow
 */

'use strict';

var { combineReducers } = require('redux');

module.exports = combineReducers({
  about: require('./about'),
  allPlayers: require('./allPlayers'),
  navigation: require('./navigation'),
});
