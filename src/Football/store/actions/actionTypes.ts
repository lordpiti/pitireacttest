import { ImagePostData } from '../../services/globalService';

//Global
export const UPDATE_LOADING_SPINNER = 'UPDATE_LOADING_SPINNER';
export const TOAST_DASH_MESSAGE = 'TOAST_DASH_MESSAGE';
export const TOAST_DASH_CLEAR = 'TOAST_DASH_CLEAR';
export const TOAST_DASH_ERROR = 'TOAST_DASH_ERROR';

type UpdateLoadingSpinnerAction = {
  type: 'UPDATE_LOADING_SPINNER';
  payload: boolean;
};

type ToastDashMessageAction = {
  type: 'TOAST_DASH_MESSAGE';
  payload: string;
  toasterType: any;
};

type ToastDashClearAction = {
  type: 'TOAST_DASH_CLEAR';
};

type ToastDashErrorAction = {
  type: 'TOAST_DASH_ERROR';
};

export type GlobalActions =
  | UpdateLoadingSpinnerAction
  | ToastDashMessageAction
  | ToastDashClearAction
  | ToastDashErrorAction;

//Players
export const LOAD_PLAYER_LIST = 'LOAD_PLAYER_LIST';
export const FILTER_PLAYER_LIST = 'FILTER_PLAYER_LIST';
export const LOAD_PLAYER = 'LOAD_PLAYER';
export const SAVE_PLAYER = 'SAVE_PLAYER';

type LoadPlayerListAction = {
  type: 'LOAD_PLAYER_LIST';
  payload: any[];
};

type FilterPlayerListAction = {
  type: 'FILTER_PLAYER_LIST';
  payload: any;
};

type LoadPlayerAction = {
  type: 'LOAD_PLAYER';
  payload: any;
};

type SavePlayerAction = {
  type: 'SAVE_PLAYER';
  payload: any;
};

export type PlayerActions =
  | LoadPlayerListAction
  | FilterPlayerListAction
  | LoadPlayerAction
  | SavePlayerAction;

//Competitions
export const LOAD_COMPETITION_LIST = 'LOAD_COMPETITION_LIST';
export const LOAD_COMPETITION_TEAMS = 'LOAD_COMPETITION_TEAMS';
export const LOAD_COMPETITION_TEAM_EVOLUTION =
  'LOAD_COMPETITION_TEAM_EVOLUTION';
export const LOAD_MATCH_INFO = 'LOAD_MATCH_INFO';
export const SAVE_COMPETITION = 'SAVE_COMPETITION';
export const LOAD_COMPETITION = 'LOAD_COMPETITION';
export const LOAD_COMPETITION_ROUND = 'LOAD_COMPETITION_ROUND';
export const LOAD_COMPETITION_DRAW = 'LOAD_COMPETITION_DRAW';

type LoadCompetitionListAction = {
  type: 'LOAD_COMPETITION_LIST';
  payload: any[];
};

type LoadCompetitionTeamsAction = {
  type: 'LOAD_COMPETITION_TEAMS';
  payload: any;
};

type LoadCompetitionTeamEvolutionAction = {
  type: 'LOAD_COMPETITION_TEAM_EVOLUTION';
  payload: any;
};

type LoadMatchInfoAction = {
  type: 'LOAD_MATCH_INFO';
  payload: any;
};

type SaveCompetitionAction = {
  type: 'SAVE_COMPETITION';
  payload: any;
};

type LoadCompetitionAction = {
  type: 'LOAD_COMPETITION';
  payload: any;
};

type LoadCompetitionRoundAction = {
  type: 'LOAD_COMPETITION_ROUND';
  payload: any;
};

type LoadCompetitionDrawAction = {
  type: 'LOAD_COMPETITION_DRAW';
  payload: any;
};

export type CompetitionActions =
  | LoadCompetitionListAction
  | LoadCompetitionTeamsAction
  | LoadCompetitionTeamEvolutionAction
  | LoadMatchInfoAction
  | SaveCompetitionAction
  | LoadCompetitionAction
  | LoadCompetitionRoundAction
  | LoadCompetitionDrawAction;

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
