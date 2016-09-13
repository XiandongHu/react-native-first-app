/**
 * @flow
 */

'use strict';

import address from './address';
import producer from './producer';

const channel = {
  loadAllPlayers: () => {
    const url = address.allPlayers();
    return fetch(url)
      .then(res => res.json())
      .then(res => producer.allPlayers(res));
  },
};

export default channel;
