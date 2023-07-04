import { put } from 'redux-saga/effects';
import { TeamData, TeamsService } from '../../services/teamsService';
import { GlobalService } from '../../services/globalService';
import { AxiosResponse } from 'axios';
import {
  toasterDashMessage,
  updateLoadingSpinner,
} from '../../Global/store/global.reducer';
import {
  loadTeamListSuccess,
  loadTeamSuccess,
  saveTeamSuccess,
} from '../../Teams/store/teams.reducer';
import {
  LoadTeamSagasAction,
  SaveTeamSagasAction,
} from '../../Teams/store/teams.actions';

const teamsService = new TeamsService();
const globalService = new GlobalService();

export function* loadTeamsSaga() {
  yield put(updateLoadingSpinner(true));

  try {
    const response: AxiosResponse<TeamData[], any> =
      yield teamsService.loadTeamList();

    yield put(loadTeamListSuccess(response.data));
    yield put(updateLoadingSpinner(false));
  } catch (error: any) {
    yield console.log(error.response.data.error);
  }
}

export function* loadTeamSaga(action: LoadTeamSagasAction) {
  yield put(updateLoadingSpinner(true));

  try {
    const response: AxiosResponse<any, any> = yield teamsService.loadTeam(
      action.payload
    );

    yield put(loadTeamSuccess(response.data));
    yield put(updateLoadingSpinner(false));
  } catch (error: any) {
    yield console.log(error.response.data.error);
  }
}

export function* saveTeamSaga(action: SaveTeamSagasAction) {
  yield put(updateLoadingSpinner(true));

  try {
    if (!action.payload.image) {
      yield teamsService.saveTeamData(action.payload.teamData);

      yield put(saveTeamSuccess(action.payload.teamData));
      yield put(updateLoadingSpinner(false));
      yield put(
        toasterDashMessage({
          message: 'Team Info has been saved',
          toasterType: 'success',
        })
      ); //success, warning, error or info
    } else {
      const response: AxiosResponse<any, any> = yield globalService.saveImage(
        action.payload.image
      );

      const updatedTeamData: unknown = yield {
        ...action.payload.teamData,
        pictureLogo: response.data,
      };

      yield teamsService.saveTeamData(updatedTeamData);

      yield put(saveTeamSuccess(updatedTeamData));
      yield put(updateLoadingSpinner(false));
      yield put(
        toasterDashMessage({
          message: 'Team Info has been saved',
          toasterType: 'success',
        })
      ); //success, warning, error or info
    }
  } catch (error: any) {
    yield console.log(error.response.data.error);
  }
}
