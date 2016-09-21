/**
 * @flow
 */

'use strict';

import type { Action, Tab } from '../actions/types';

function navigation(state: Tab = 'today', action: Action): Tab {
  if (action.type === 'SWITCH_TAB') {
    return action.tab || state;
  }
  return state;
}

module.exports = navigation;
