import axiosInstance from '../../utilities/axios-test';
import * as actionTypes from './actionTypes';
import * as globalActionCreators from './global';

export const loadCompetitionTeamsSuccess = (teamList) => {
  return {
      type: actionTypes.LOAD_COMPETITION_TEAMS,
      payload: teamList
  };
};

export const loadCompetitionTeamEvolutionSuccess = (teamList) => {
  return {
      type: actionTypes.LOAD_COMPETITION_TEAM_EVOLUTION,
      payload: teamList
  };
};

export const loadCompetitionTeams = (competitionId) => {
  return dispatch => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));
    axiosInstance.get(`team/teams`).then( response => {
      const teamList = response.data;
      dispatch(loadCompetitionTeamsSuccess(teamList));
      dispatch(globalActionCreators.updateLoadingSpinner(false));
    });
  }
};

export const loadCompetitionTeamEvolution = (competitionId, teamId) => {
  
  return dispatch => {
    //dispatch(globalActionCreators.updateLoadingSpinner(true));
    axiosInstance.get(`team/clasification/${teamId}/competition/${competitionId}`).then( response => {
      dispatch(loadCompetitionTeamEvolutionSuccess(response.data.clasificationSeasonData));
      //dispatch(globalActionCreators.updateLoadingSpinner(false));
    });
  }
};