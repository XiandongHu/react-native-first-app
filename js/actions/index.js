/**
 * @flow
 */

'use strict'

const aboutActions = require('./about');
const dataActions = require('./data');
const navigationActions = require('./navigation');

module.exports = {
  ...aboutActions,
  ...dataActions,
  ...navigationActions,
};
