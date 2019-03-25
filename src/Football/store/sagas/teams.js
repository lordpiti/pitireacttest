import { put } from "redux-saga/effects";
import * as  teamActionCreators from '../actions/teams';
import * as globalActionCreators from '../actions/global';
import axiosInstance from '../../utilities/axios-test';


export function* loadTeamsSaga(action) {

    yield put(globalActionCreators.updateLoadingSpinner(true));

    try {
      const response = yield axiosInstance.get('team/teams/');

      yield put(
        teamActionCreators.loadTeamListSuccess(response.data)
      );
      yield put(globalActionCreators.updateLoadingSpinner(false));
    } catch (error) {
        yield console.log(error.response.data.error);
    }
  }