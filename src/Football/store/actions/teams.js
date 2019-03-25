import * as actionTypes from './actionTypes';

export const loadTeamListSuccess = (teamList) => {
  return {
      type: actionTypes.LOAD_TEAM_LIST,
      payload: teamList
  };
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

export const loadTeamSagas = (id) => {
  return {
    type: actionTypes.LOAD_TEAM_SAGAS,
    payload: id
  };
};

export const saveTeamSagas = (image, teamData) => {
  return {
    type: actionTypes.SAVE_TEAM_SAGAS,
    payload: {
      image: image,
      teamData: teamData
    }
  }
}

export const saveTeamSuccess = (teamData) => {
  return {
      type: actionTypes.SAVE_TEAM,
      payload: teamData
  };
};