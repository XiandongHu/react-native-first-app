/**
 * @flow
 */

'use strict';

import type { Player } from '../../reducers/allPlayers';

function byTeamAbbr(players: Array<Player>, abbrs: Array<string>): Array<Player> {
  if (abbrs.length === 0) {
    return players;
  }
  return players.filter((player) => {
    for (var i = 0; i < abbrs.length; i++) {
      if (abbrs[i] === player.teamAbbr) {
        return true;
      }
    }
    return false;
  });
}

module.exports = { byTeamAbbr };
