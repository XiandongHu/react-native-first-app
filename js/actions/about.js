/**
 * @flow
 */

'use strict';

import type { Action } from './types';

function loadAbout(): Action {
  const msg = 'First React Native App';
  return {
    type: 'LOADED_ABOUT',
    msg,
  };
}

module.exports = { loadAbout };
