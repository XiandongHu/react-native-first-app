/**
 * @flow
 */

'use strict';

import channel from '../channel';
import type { ThunkAction } from './types';

module.exports = {
  loadGames: (year: string, month: string, day: string): ThunkAction => {
    return (dispatch) => {
      channel.loadGames(year, month, day)
        .then(data => {
          dispatch(({type: 'LOADED_GAMES', games: data}: any));
        })
        .catch(err => console.error(err));
    };
  },

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
