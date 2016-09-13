/**
 * @flow
 */

'use strict'

const aboutActions = require('./about');
const dataActions = require('./data');

module.exports = {
  ...aboutActions,
  ...dataActions,
};
