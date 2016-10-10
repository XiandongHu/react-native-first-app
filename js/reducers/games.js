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
  progress: string;
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
    id: team.id,
    key: team.key,
    score: team.score,
  };
}

function fromGame(game: Object): Game {
  return {
    id: game.id,
    status: game.status,
    progress: game.progress,
    quarter: game.quarter,
    home: fromTeam(game.home),
    visitor: fromTeam(game.visitor),
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
