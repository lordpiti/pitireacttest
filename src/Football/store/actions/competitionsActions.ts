import * as actionTypes from './actionTypes';
import * as globalActionCreators from './globalActions';
import { GlobalService, ImagePostData } from '../../services/globalService';
import { CompetitionService } from '../../services/competitionsService';
import { FootballDispatch } from '../middleware/thunkMiddleware';

const globalService = new GlobalService();
const competitionService = new CompetitionService();

export const loadCompetitionListSuccess = (competitionList: any[]) => {
  return {
    type: actionTypes.LOAD_COMPETITION_LIST,
    payload: competitionList,
  };
};

export const loadCompetitionTeamsSuccess = (teamList: any[]) => {
  return {
    type: actionTypes.LOAD_COMPETITION_TEAMS,
    payload: teamList,
  };
};

export const loadCompetitionTeamEvolutionSuccess = (teamList: any) => {
  return {
    type: actionTypes.LOAD_COMPETITION_TEAM_EVOLUTION,
    payload: teamList,
  };
};

export const loadMatchSuccess = (matchInfo: any) => {
  return {
    type: actionTypes.LOAD_MATCH_INFO,
    payload: matchInfo,
  };
};

export const loadCompetitionList = () => {
  return async (dispatch: FootballDispatch) => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));
    const response = await competitionService.loadCompetitionList();
    dispatch(loadCompetitionListSuccess(response.data));
    dispatch(globalActionCreators.updateLoadingSpinner(false));
  };
};

export const loadCompetitionTeams = (competitionId: number) => {
  return async (dispatch: FootballDispatch) => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));
    const response = await competitionService.getCompetitionTeams(
      competitionId
    );
    const teamList = response.data as any;
    dispatch(loadCompetitionTeamsSuccess(teamList));
    dispatch(globalActionCreators.updateLoadingSpinner(false));
  };
};

export const loadCompetitionTeamEvolution = (
  competitionId: number,
  teamId: number
) => {
  return async (dispatch: FootballDispatch) => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));

    const response = await competitionService.getCompetitionTeamEvolution(
      competitionId,
      teamId
    );

    dispatch(
      loadCompetitionTeamEvolutionSuccess({
        teamId: teamId,
        chartData: (response.data as any).clasificationSeasonData,
      })
    );
    dispatch(globalActionCreators.updateLoadingSpinner(false));
  };
};

export const loadMatchInfo = (matchId: number) => {
  return async (dispatch: FootballDispatch) => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));
    const response = await competitionService.getMatchInfo(matchId);
    dispatch(loadMatchSuccess(response.data));
    dispatch(globalActionCreators.updateLoadingSpinner(false));
  };
};

export const loadCompetitionSuccess = (competitionData: any) => {
  return {
    type: actionTypes.LOAD_COMPETITION,
    payload: competitionData,
  };
};

export const loadCompetition = (id: number) => {
  return async (dispatch: FootballDispatch) => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));
    const response = await competitionService.getCompetition(id);
    dispatch(loadCompetitionSuccess(response.data));
    dispatch(globalActionCreators.updateLoadingSpinner(false));
  };
};

export const loadCompetitionRoundSuccess = (rounds: any) => {
  return {
    type: actionTypes.LOAD_COMPETITION_ROUND,
    payload: rounds,
  };
};

export const loadCompetitionRound = (id: number, round: string) => {
  return async (dispatch: FootballDispatch) => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));
    const response = await competitionService.getCompetitionRound(id, round);
    dispatch(loadCompetitionRoundSuccess(response.data));
    dispatch(globalActionCreators.updateLoadingSpinner(false));
  };
};

export const loadCompetitionDraw = (id: number) => {
  return async (dispatch: FootballDispatch) => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));
    const response = await competitionService.getCompetitionDraw(id);
    dispatch(loadCompetitionDrawSuccess(response.data));
    dispatch(globalActionCreators.updateLoadingSpinner(false));
  };
};

export const loadCompetitionDrawSuccess = (draw: any) => {
  return {
    type: actionTypes.LOAD_COMPETITION_DRAW,
    payload: draw,
  };
};

// apiInstance
// .get('competition/' + props.competitionData.id + '/getDraw/')
// .then((response) => {
//   setDrawState(response.data);
// });

export const saveCompetition = (image: any, competitionData: any) => {
  return async (dispatch: FootballDispatch) => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));

    if (!image) {
      await competitionService.saveCompetitionData(competitionData);

      dispatch(saveCompetitionSuccess(competitionData));
      dispatch(globalActionCreators.updateLoadingSpinner(false));
      dispatch(
        globalActionCreators.acToastDashMessage(
          'Competition Info has been saved',
          'success'
        )
      ); //success, warning, error or info
    } else {
      const response = await globalService.saveDocument(image);
      const updatedCompetitionData = {
        ...competitionData,
        logo: response.data,
      };
      await competitionService.saveCompetitionData(updatedCompetitionData);
      dispatch(saveCompetitionSuccess(updatedCompetitionData));
      dispatch(globalActionCreators.updateLoadingSpinner(false));
      dispatch(
        globalActionCreators.acToastDashMessage(
          'Competition Info has been saved',
          'success'
        )
      ); //success, warning, error or info
    }
  };
};

export const saveCompetitionSuccess = (competitionData: any) => {
  return {
    type: actionTypes.SAVE_COMPETITION,
    payload: competitionData,
  };
};
