/**
 * @flow
 */

'use strict';

export type Tab = 'today' | 'schedule' | 'community' | 'setting' | 'playground';

export type Action =
    { type: 'LOADED_ABOUT', msg: string }
  | { type: 'SKIPPED_LOGIN' }
  | { type: 'LOADED_GAMES', games: Object }
  | { type: 'LOADED_GAME_DETAIL', detail: Object }
  | { type: 'LOADED_ALL_PLAYERS', list: Array<Object> }
  | { type: 'SWITCH_TAB', tab: Tab }
  ;

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
