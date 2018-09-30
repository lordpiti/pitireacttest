import axiosInstance from '../../utilities/axios-test';
import * as actionTypes from './actionTypes';
import * as globalActionCreators from './global';

export const loadCompetitionListSuccess = (competitionList) => {
  return {
      type: actionTypes.LOAD_COMPETITION_LIST,
      payload: competitionList
  };
};

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

export const loadMatchSuccess = (matchInfo) => {
  return {
      type: actionTypes.LOAD_MATCH_INFO,
      payload: matchInfo
  };
};

export const loadCompetitionList = () => {
  return dispatch => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));
    axiosInstance.get('competition').then( response => {
      dispatch(loadCompetitionListSuccess(response.data));
      dispatch(globalActionCreators.updateLoadingSpinner(false));
    });
  }
};

export const loadCompetitionTeams = (competitionId) => {
  return dispatch => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));
    axiosInstance.get(`team/teams/${competitionId}`).then( response => {
      const teamList = response.data;
      dispatch(loadCompetitionTeamsSuccess(teamList));
      dispatch(globalActionCreators.updateLoadingSpinner(false));
    });
  }
};

export const loadCompetitionTeamEvolution = (competitionId, teamId) => {
  
  return dispatch => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));
    axiosInstance.get(`team/clasification/${teamId}/competition/${competitionId}`).then( response => {
      dispatch(loadCompetitionTeamEvolutionSuccess({ teamId: teamId, chartData: response.data.clasificationSeasonData }));
      dispatch(globalActionCreators.updateLoadingSpinner(false));
    });
  }
};

export const loadMatchInfo = (matchId) => {
  return dispatch => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));
    axiosInstance.get(`competition/match/${matchId}`).then( response => {
      dispatch(loadMatchSuccess(response.data));
      dispatch(globalActionCreators.updateLoadingSpinner(false));
    });
  }
};

export const loadCompetitionSuccess = (competitionData) => {
  return {
      type: actionTypes.LOAD_COMPETITION,
      payload: competitionData
  };
};

export const loadCompetition = (id) => {
  return dispatch => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));
    axiosInstance.get(`competition/${id}`).then( response => {
      dispatch(loadCompetitionSuccess(response.data));
      dispatch(globalActionCreators.updateLoadingSpinner(false));
    });
  }
};

export const saveCompetition = (image, competitionData) => {

  return dispatch => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));

    if (!image) {
      axiosInstance.post(`competition/saveCompetitionDetails`, competitionData).then( response => {
        dispatch(saveCompetitionSuccess(competitionData));
        dispatch(globalActionCreators.updateLoadingSpinner(false));
      });
    }
    else {

      axiosInstance.post('GlobalMedia/UploadBase64Image',
        { Base64String: image.data, FileName: image.fileName })
        .then(response => {
          const updatedCompetitionData = { ...competitionData, logo: response.data }
          axiosInstance.post(`competition/saveCompetitionDetails`, updatedCompetitionData).then( response => {
            dispatch(saveCompetitionSuccess(updatedCompetitionData));
            dispatch(globalActionCreators.updateLoadingSpinner(false));
          });
        })
    }

  }
};

export const saveCompetitionSuccess = (competitionData) => {
  return {
      type: actionTypes.SAVE_COMPETITION,
      payload: competitionData
  };
};