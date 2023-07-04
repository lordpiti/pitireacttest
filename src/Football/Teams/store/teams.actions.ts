import { ImagePostData } from '../../services/globalService';

//Teams
export const LOAD_TEAM_LIST = 'LOAD_TEAM_LIST';
export const LOAD_TEAM = 'LOAD_TEAM';
export const SAVE_TEAM = 'SAVE_TEAM';
export const CLEAR_TEAM_DATA = 'CLEAR_TEAM_DATA';

interface TeamDataWithImage {
  image: ImagePostData;
  teamData: any;
}

type LoadTeamListAction = {
  type: 'LOAD_TEAM_LIST';
  payload: any[];
};

type LoadTeamAction = {
  type: 'LOAD_TEAM';
  payload: any;
};

type SaveTeamAction = {
  type: 'SAVE_TEAM';
  payload: TeamDataWithImage;
};

export type ClearTeamDataAction = {
  type: 'CLEAR_TEAM_DATA';
};

export type TeamActions =
  | LoadTeamListAction
  | LoadTeamAction
  | SaveTeamAction
  | ClearTeamDataAction;

export const LOAD_TEAM_LIST_SAGAS = 'LOAD_TEAM_LIST_SAGAS';
export const LOAD_TEAM_SAGAS = 'LOAD_TEAM_SAGAS';
export const SAVE_TEAM_SAGAS = 'SAVE_TEAM_SAGAS';

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
  | LoadTeamListAction
  | LoadTeamListSagasAction
  | LoadTeamAction
  | LoadTeamSagasAction
  | SaveTeamAction
  | SaveTeamSagasAction
  | ClearTeamDataAction;
