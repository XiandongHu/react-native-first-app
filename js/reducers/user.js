/**
 * @flow
 */

'use strict';

import { Action } from '../actions/types';

export type User = {
  isLoggedIn: boolean;
  hasSkippedLogin: boolean;
  id: ?string;
  name: ?string;
};

const initialState: User = {
  isLoggedIn: false,
  hasSkippedLogin: false,
  id: null,
  name: null,
};

function user(state: User = initialState, action: Action): User {
  if (action.type === 'SKIPPED_LOGIN') {
    return {
      isLoggedIn: false,
      hasSkippedLogin: true,
      id: null,
      name: null,
    };
  }

  return state;
}

module.exports = user;
