import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import {
    loadTeamsSaga,
} from "./teams";

export function* watchTeams() {
  yield takeEvery(actionTypes.LOAD_TEAM_LIST_SAGAS, loadTeamsSaga);
}
