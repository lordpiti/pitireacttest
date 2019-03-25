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

export function* loadTeamSaga(action) {

  yield put(globalActionCreators.updateLoadingSpinner(true));

  try {
    const response = yield axiosInstance.get(`team/teams/${action.payload}/year/2009/`);

    yield put(
      teamActionCreators.loadTeamSuccess(response.data)
    );
    yield put(globalActionCreators.updateLoadingSpinner(false));
  } catch (error) {
    yield console.log(error.response.data.error);
  }
  
}

export function* saveTeamSaga(action) {

  yield put(globalActionCreators.updateLoadingSpinner(true));

  try {

    if (!action.payload.image) {

      const response = yield axiosInstance.post(`team/saveTeamDetails`, action.payload.teamData);

      yield put(teamActionCreators.saveTeamSuccess(action.payload.teamData));
      yield put(globalActionCreators.updateLoadingSpinner(false));
      yield put(globalActionCreators.acToastDashMessage("Team Info has been saved", "success")); //success, warning, error or info
      
    }
    else {

      const response = yield axiosInstance.post('GlobalMedia/UploadBase64Image',
        { Base64String: action.payload.image.data, FileName: action.payload.image.fileName });

      const updatedTeamData = yield { ...action.payload.teamData, pictureLogo: response.data }
          
      const response2 = yield axiosInstance.post(`team/saveTeamDetails`, updatedTeamData);

      yield put(teamActionCreators.saveTeamSuccess(updatedTeamData));
      yield put(globalActionCreators.updateLoadingSpinner(false));         
      yield put(globalActionCreators.acToastDashMessage("Team Info has been saved", "success")); //success, warning, error or info
    }
  } catch (error) {
    yield console.log(error.response.data.error);
  }
}