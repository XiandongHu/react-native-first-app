/**
 * @flow
 */

'use strict';

import channel from '../channel';
import type { ThunkAction } from './types';

module.exports = {
  loadAllPlayers: (): ThunkAction => {
    return (dispatch) => {
      channel.loadAllPlayers()
        .then(data => {
          dispatch(({type: 'LOADED_ALL_PLAYERS', list: data}: any));
        })
        .catch(err => console.error(err));
    };
  },
};
