import axiosInstance from '../../utilities/axios-test';
import * as actionTypes from './actionTypes';
import * as globalActionCreators from './global';

export const loadTeamListSuccess = (teamList) => {
  return {
      type: actionTypes.LOAD_TEAM_LIST,
      payload: teamList
  };
};

export const loadTeams = () => {
  return dispatch => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));
    axiosInstance.get('team/teams/').then( response => {
      dispatch(loadTeamListSuccess(response.data));
      dispatch(globalActionCreators.updateLoadingSpinner(false));
    });
  }
};

export const loadTeamsSagas = () => {
  return {
    type: actionTypes.LOAD_TEAM_LIST_SAGAS
  };
};

export const loadTeamSuccess = (teamData) => {
  return {
      type: actionTypes.LOAD_TEAM,
      payload: teamData
  };
};

export const loadTeam = (id) => {
  return dispatch => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));
    axiosInstance.get(`team/teams/${id}/year/2009/`).then( response => {
      dispatch(loadTeamSuccess(response.data));
      dispatch(globalActionCreators.updateLoadingSpinner(false));
    });
  }
};

export const saveTeam = (image, teamData) => {

  return dispatch => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));

    if (!image) {
      axiosInstance.post(`team/saveTeamDetails`, teamData).then( response => {
        dispatch(saveTeamSuccess(teamData));
        dispatch(globalActionCreators.updateLoadingSpinner(false));
        dispatch(globalActionCreators.acToastDashMessage("Team Info has been saved", "success")); //success, warning, error or info
      });
    }
    else {

      axiosInstance.post('GlobalMedia/UploadBase64Image',
        { Base64String: image.data, FileName: image.fileName })
        .then(response => {
          const updatedTeamData = { ...teamData, pictureLogo: response.data }
          axiosInstance.post(`team/saveTeamDetails`, updatedTeamData).then( response => {
            dispatch(saveTeamSuccess(updatedTeamData));
            dispatch(globalActionCreators.updateLoadingSpinner(false));
            dispatch(globalActionCreators.acToastDashMessage("Team Info has been saved", "success")); //success, warning, error or info
          });
        })
    }

  }
};


export const saveTeamSuccess = (teamData) => {
  return {
      type: actionTypes.SAVE_TEAM,
      payload: teamData
  };
};