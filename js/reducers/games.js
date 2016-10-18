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
  detail: Object;
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
    detail: {
      loaded: false,
      data: {},
    },
  };
}

function updateGame(game: Game, detail: Object): Game {
  game.status = detail.status;
  game.progress = detail.progress;
  game.quarter = detail.quarter;
  game.detail.loaded = true;
  game.detail.data = detail;
  return game;
}

function games(state: Games = initialState, action: Action): Games {
  if (action.type === 'LOADED_GAMES') {
    return {
      date: action.games.date,
      unstart: action.games.unstart.map(fromGame),
      live: action.games.live.map(fromGame),
      over: action.games.over.map(fromGame),
    };
  } else if (action.type === 'LOADED_GAME_DETAIL') {
    let newState = Object.assign({}, state);
    let newGame;
    for (let i = 0, length = newState.live.length; i < length; i++) {
      let game = newState.live[i];
      if (game.id === action.detail.id) {
        newGame = updateGame(game, action.detail);
        if (newGame.status === 'over') {
          newState.live.splice(i, 1);
          newState.over.push(newGame);
        }
        break;
      }
    }
    if (!newGame) {
      newState.over.some((game) => {
        if (game.id === action.detail.id) {
          updateGame(game, action.detail);
          return true;
        }
        return false;
      });
    }
    return newState;
  }

  return state;
}

module.exports = games;
