import * as actionTypes from './actionTypes';

export const loadTeamListSuccess = (teamList: any[]) => {
  return {
    type: actionTypes.LOAD_TEAM_LIST,
    payload: teamList,
  };
};

export const loadTeamsSagas = () => {
  return {
    type: actionTypes.LOAD_TEAM_LIST_SAGAS,
  } as actionTypes.LoadTeamListSagasAction;
};

export const loadTeamSuccess = (teamData: any) => {
  return {
    type: actionTypes.LOAD_TEAM,
    payload: teamData,
  };
};

export const loadTeamSagas = (id: number) => {
  return {
    type: actionTypes.LOAD_TEAM_SAGAS,
    payload: id,
  } as actionTypes.LoadTeamSagasAction;
};

export const saveTeamSagas = (image: any, teamData: any) => {
  return {
    type: actionTypes.SAVE_TEAM_SAGAS,
    payload: {
      image: image,
      teamData: teamData,
    },
  } as actionTypes.SaveTeamSagasAction;
};

export const saveTeamSuccess = (teamData: any) => {
  return {
    type: actionTypes.SAVE_TEAM,
    payload: teamData,
  };
};

export const clearTeamData = () => {
  return {
    type: actionTypes.CLEAR_TEAM_DATA,
  } as actionTypes.ClearTeamDataAction;
};
