/**
 * @flow
 */

'use strict';

export type Action =
    { type: 'LOADED_ABOUT', msg: string }
  | { type: 'LOADED_ALL_PLAYERS', list: Array<Object> }
  ;

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
