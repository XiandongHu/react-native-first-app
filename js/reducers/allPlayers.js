/**
 * @flow
 */

'use strict';

const createListReducer = require('./createListReducer');

export type Player = {
  id: number;
  name: string;
  teamId: number;
  teamCity: string;
  teamName: string;
};

function fromPlayer(player: Object): Player {
  return {
    id: player.id,
    name: player.name,
    teamId: player.teamId,
    teamCity: player.teamCity,
    teamName: player.teamName,
  };
}

module.exports = createListReducer('LOADED_ALL_PLAYERS', fromPlayer);
