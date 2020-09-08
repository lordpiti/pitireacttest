import teamsReducer from './reducers/teams';
import globalReducer from './reducers/global';
import playersReducer from './reducers/players';
import competitionsReducer from './reducers/competitions';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  players: playersReducer,
  competitions: competitionsReducer,
  teams: teamsReducer,
  global: globalReducer,
});
