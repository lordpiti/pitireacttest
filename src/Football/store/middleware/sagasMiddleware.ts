import { Dispatch } from 'react';
import createSagaMiddleware from 'redux-saga';
import { TeamSagasActions } from '../actions/actionTypes';

// Note that when typing the dispatch here, we will have to cast the actions
// returned by the action creators to match the type here
export type FootballSagasDispatch = Dispatch<TeamSagasActions>;

export const sagaMiddleware = createSagaMiddleware();
