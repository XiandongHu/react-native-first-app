/**
 * @flow
 */

'use strict';

import type { Action, Tab } from './types';

module.exports = {
  switchTab: (tab: Tab): Action => ({
    type: 'SWITCH_TAB',
    tab: tab,
  }),
};
