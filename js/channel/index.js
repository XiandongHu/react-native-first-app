/**
 * @flow
 */

'use strict';

import address from './address';
import producer from './producer';

const channel = {
  loadGames: (year: string, month: string, day: string) => {
    const url = address.games(`${year}${month}${day}`);
    return window.fetch(url)
      .then(res => res.json())
      .then(res => {
        const games = producer.games(res);
        games.date = `${year}-${month}-${day}`;
        return games;
      });
  },

  loadGameDetail: (year: string, month: string, day: string, id: string) => {
    const url = address.gameDetail(`${year}${month}${day}`, id);
    return window.fetch(url)
      .then(res => res.json())
      .then(res => {
        const detail = producer.gameDetail(res);
        detail.id = `${id}`;
        return detail;
      });
  },

  loadAllPlayers: () => {
    const url = address.allPlayers();
    return window.fetch(url)
      .then(res => res.json())
      .then(res => producer.allPlayers(res));
  },
};

export default channel;
