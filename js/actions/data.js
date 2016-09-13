/**
 * @flow
 */

'use strict';

import type { ThunkAction } from './types';

import channel from '../channel';

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
