/**
 * @flow
 */

'use strict';

import type { Action } from '../actions/types';

export type Status = 'unstart' | 'live' | 'over';

export type Team = {
  id: string;
  key: string;
  score: number;
};

export type Game = {
  id: string;
  status: Status;
  date: string;
  clock: string;
  quarter: string;
  home: Team;
  visitor: Team;
};

export type Games = {
  date: string;
  unstart: Array<Game>;
  live: Array<Game>;
  over: Array<Game>;
};

const initialState: Games = {
  date: '',
  unstart: [],
  live: [],
  over: [],
};

function fromTeam(team: Object): Team {
  return {
    id: team.get('id'),
    key: team.get('key'),
    score: team.get('score'),
  };
}

function fromGame(game: Object): Game {
  return {
    id: game.get('id'),
    status: game.get('status'),
    date: game.get('date'),
    clock: game.get('clock'),
    quarter: game.get('quarter'),
    home: fromTeam(game.get('home')),
    visitor: fromTeam(game.get('visitor')),
  };
}

function games(state: Games = initialState, action: Action): Games {
  if (action.type === 'LOADED_GAMES') {
    return {
      date: action.games.date,
      unstart: action.games.unstart.map(fromGame),
      live: action.games.live.map(fromGame),
      over: action.games.over.map(fromGame),
    };
  }

  return state;
}

module.exports = games;
