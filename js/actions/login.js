/**
 * @flow
 */

'use strict';

import type { Action } from './types';

function skipLogin(): Action {
  return {
    type: 'SKIPPED_LOGIN',
  };
}

module.exports = { skipLogin };
