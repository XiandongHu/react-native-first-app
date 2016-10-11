/**
 * @flow
 */

'use strict'

const aboutActions = require('./about');
const loginActions = require('./login');
const dataActions = require('./data');
const navigationActions = require('./navigation');

module.exports = {
  ...aboutActions,
  ...loginActions,
  ...dataActions,
  ...navigationActions,
};
