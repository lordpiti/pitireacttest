import { takeEvery, all } from 'redux-saga/effects';
import {
  LOAD_TEAM_LIST_SAGAS,
  LOAD_TEAM_SAGAS,
  SAVE_TEAM_SAGAS,
} from '../../Teams/store/teams.actions';

import { loadTeamsSaga, loadTeamSaga, saveTeamSaga } from './teams';

export function* watchTeams() {
  yield all([
    takeEvery(LOAD_TEAM_LIST_SAGAS, loadTeamsSaga),
    takeEvery(LOAD_TEAM_SAGAS, loadTeamSaga),
    takeEvery(SAVE_TEAM_SAGAS, saveTeamSaga),
  ]);
}
