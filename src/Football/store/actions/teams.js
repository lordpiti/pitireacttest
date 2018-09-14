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