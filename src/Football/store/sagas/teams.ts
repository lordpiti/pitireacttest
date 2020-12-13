import { put } from 'redux-saga/effects';
import * as teamActionCreators from '../actions/teamsActions';
import * as globalActionCreators from '../actions/globalActions';
import { TeamsService } from '../../services/teamsService';
import { GlobalService } from '../../services/globalService';
import {
  LoadTeamSagasAction,
  SaveTeamSagasAction,
} from '../actions/actionTypes';

const teamsService = new TeamsService();
const globalService = new GlobalService();

export function* loadTeamsSaga() {
  yield put(globalActionCreators.updateLoadingSpinner(true));

  try {
    const response = yield teamsService.loadTeamList();

    yield put(teamActionCreators.loadTeamListSuccess(response.data));
    yield put(globalActionCreators.updateLoadingSpinner(false));
  } catch (error) {
    yield console.log(error.response.data.error);
  }
}

export function* loadTeamSaga(action: LoadTeamSagasAction) {
  yield put(globalActionCreators.updateLoadingSpinner(true));

  try {
    const response = yield teamsService.loadTeam(action.payload);

    yield put(teamActionCreators.loadTeamSuccess(response.data));
    yield put(globalActionCreators.updateLoadingSpinner(false));
  } catch (error) {
    yield console.log(error.response.data.error);
  }
}

export function* saveTeamSaga(action: SaveTeamSagasAction) {
  yield put(globalActionCreators.updateLoadingSpinner(true));

  try {
    if (!action.payload.image) {
      yield teamsService.saveTeamData(action.payload.teamData);

      yield put(teamActionCreators.saveTeamSuccess(action.payload.teamData));
      yield put(globalActionCreators.updateLoadingSpinner(false));
      yield put(
        globalActionCreators.acToastDashMessage(
          'Team Info has been saved',
          'success'
        )
      ); //success, warning, error or info
    } else {
      const response = yield globalService.saveImage(action.payload.image);

      const updatedTeamData = yield {
        ...action.payload.teamData,
        pictureLogo: response.data,
      };

      yield teamsService.saveTeamData(updatedTeamData);

      yield put(teamActionCreators.saveTeamSuccess(updatedTeamData));
      yield put(globalActionCreators.updateLoadingSpinner(false));
      yield put(
        globalActionCreators.acToastDashMessage(
          'Team Info has been saved',
          'success'
        )
      ); //success, warning, error or info
    }
  } catch (error) {
    yield console.log(error.response.data.error);
  }
}
