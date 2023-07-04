import { ImagePostData } from '../../services/globalService';

export const CLEAR_TEAM_DATA = 'CLEAR_TEAM_DATA';
export const LOAD_TEAM_LIST_SAGAS = 'LOAD_TEAM_LIST_SAGAS';
export const LOAD_TEAM_SAGAS = 'LOAD_TEAM_SAGAS';
export const SAVE_TEAM_SAGAS = 'SAVE_TEAM_SAGAS';

interface TeamDataWithImage {
  image: ImagePostData;
  teamData: any;
}

export type ClearTeamDataAction = {
  type: 'CLEAR_TEAM_DATA';
};

export type LoadTeamListSagasAction = {
  type: 'LOAD_TEAM_LIST_SAGAS';
};

export type LoadTeamSagasAction = {
  type: 'LOAD_TEAM_SAGAS';
  payload: number;
};

export type SaveTeamSagasAction = {
  type: 'SAVE_TEAM_SAGAS';
  payload: TeamDataWithImage;
};

export type TeamSagasActions =
  | LoadTeamListSagasAction
  | LoadTeamSagasAction
  | SaveTeamSagasAction
  | ClearTeamDataAction;

export const loadTeamsSagas = () => {
  return {
    type: LOAD_TEAM_LIST_SAGAS,
  } as LoadTeamListSagasAction;
};

export const loadTeamSagas = (id: number) => {
  return {
    type: LOAD_TEAM_SAGAS,
    payload: id,
  } as LoadTeamSagasAction;
};

export const saveTeamSagas = (image: any, teamData: any) => {
  return {
    type: SAVE_TEAM_SAGAS,
    payload: {
      image: image,
      teamData: teamData,
    },
  } as SaveTeamSagasAction;
};

export const clearTeamData = () => {
  return {
    type: CLEAR_TEAM_DATA,
  } as ClearTeamDataAction;
};
