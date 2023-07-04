import { combineReducers } from '@reduxjs/toolkit';
import competitionsReducer from '../../Competitions/store/competitions.reducer';
import playersReducer from '../../Players/store/players.reducer';
import globalReducer from '../../Global/store/global.reducer';
import teamsReducer from '../../Teams/store/teams.reducer';

export const reducers = combineReducers({
  competitionsState: competitionsReducer,
  playersState: playersReducer,
  globalState: globalReducer,
  teamsState: teamsReducer,
});
