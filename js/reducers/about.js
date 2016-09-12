/**
 * @flow
 */

'use strict';

import type { Action } from '../actions/types';

function about(state: string = '', action: Action): string {
  if (action.type === 'LOADED_ABOUT') {
    return action.msg || state;
  }

  return state;
}

module.exports = about;
