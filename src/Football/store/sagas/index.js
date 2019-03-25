import { takeEvery, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import {
    loadTeamsSaga,
    loadTeamSaga,
    saveTeamSaga
} from "./teams";

export function* watchTeams() {
  yield all([
    takeEvery(actionTypes.LOAD_TEAM_LIST_SAGAS, loadTeamsSaga),
    takeEvery(actionTypes.LOAD_TEAM_SAGAS, loadTeamSaga),
    takeEvery(actionTypes.SAVE_TEAM_SAGAS, saveTeamSaga)
  ])

}
