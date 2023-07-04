import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loadCompetitionDrawSuccess,
  loadCompetitionListSuccess,
  loadCompetitionRoundSuccess,
  loadCompetitionSuccess,
  loadCompetitionTeamEvolutionSuccess,
  loadCompetitionTeamsSuccess,
  loadMatchInfoSuccess,
  saveCompetitionSuccess,
} from './competitions.reducer';
import { CompetitionService } from '../../services/competitionsService';
import { GlobalService } from '../../services/globalService';
import {
  toasterDashMessage,
  updateLoadingSpinner,
} from '../../Global/store/global.reducer';

const competitionService = new CompetitionService();
const globalService = new GlobalService();

export const loadCompetitionList = createAsyncThunk(
  'competitions/loadCompetitionList',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(updateLoadingSpinner(true));
    const response = await competitionService.loadCompetitionList();
    thunkAPI.dispatch(loadCompetitionListSuccess(response.data));
    thunkAPI.dispatch(updateLoadingSpinner(false));
  }
);

export const loadCompetitionTeams = createAsyncThunk(
  'competitions/loadCompetitionTeams',
  async (competitionId: number, thunkAPI) => {
    thunkAPI.dispatch(updateLoadingSpinner(true));
    const response = await competitionService.getCompetitionTeams(
      competitionId
    );
    const teamList = response.data;
    thunkAPI.dispatch(loadCompetitionTeamsSuccess(teamList));
    thunkAPI.dispatch(updateLoadingSpinner(false));
  }
);

export const loadCompetitionTeamEvolution = createAsyncThunk(
  'competitions/loadCompetitionTeamEvolution',
  async (
    { competitionId, teamId }: { competitionId: number; teamId: number },
    thunkAPI
  ) => {
    thunkAPI.dispatch(updateLoadingSpinner(true));

    const response = await competitionService.getCompetitionTeamEvolution(
      competitionId,
      teamId
    );
    thunkAPI.dispatch(
      loadCompetitionTeamEvolutionSuccess({
        teamId: teamId,
        chartData: response.data.clasificationSeasonData,
      })
    );
    thunkAPI.dispatch(updateLoadingSpinner(false));
  }
);

export const loadMatchInfo = createAsyncThunk(
  'competitions/loadMatchInfo',
  async (matchId: number, thunkAPI) => {
    thunkAPI.dispatch(updateLoadingSpinner(true));
    const response = await competitionService.getMatchInfo(matchId);
    thunkAPI.dispatch(loadMatchInfoSuccess(response.data));
    thunkAPI.dispatch(updateLoadingSpinner(false));
  }
);

export const loadCompetition = createAsyncThunk(
  'competitions/loadCompetition',
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(updateLoadingSpinner(true));
    const response = await competitionService.getCompetition(id);
    thunkAPI.dispatch(loadCompetitionSuccess(response.data));
    thunkAPI.dispatch(updateLoadingSpinner(false));
  }
);

export const loadCompetitionRound = createAsyncThunk(
  'competitions/loadCompetitionRound',
  async ({ id, round }: { id: number; round: number }, thunkAPI) => {
    thunkAPI.dispatch(updateLoadingSpinner(true));
    const response = await competitionService.getCompetitionRound(id, round);
    thunkAPI.dispatch(loadCompetitionRoundSuccess(response.data));
    thunkAPI.dispatch(updateLoadingSpinner(false));
  }
);

export const loadCompetitionDraw = createAsyncThunk(
  'competitions/loadCompetitionDraw',
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(updateLoadingSpinner(true));
    const response = await competitionService.getCompetitionDraw(id);
    thunkAPI.dispatch(loadCompetitionDrawSuccess(response.data));
    thunkAPI.dispatch(updateLoadingSpinner(false));
  }
);

export const saveCompetition = createAsyncThunk(
  'competitions/loadCompetitionDraw',
  async (
    { image, competitionData }: { image: any; competitionData: any },
    thunkAPI
  ) => {
    thunkAPI.dispatch(updateLoadingSpinner(true));

    if (!image) {
      await competitionService.saveCompetitionData(competitionData);

      thunkAPI.dispatch(saveCompetitionSuccess(competitionData));
      thunkAPI.dispatch(updateLoadingSpinner(false));
      thunkAPI.dispatch(
        toasterDashMessage({
          message: 'Competition Info has been saved',
          toasterType: 'success',
        })
      );
    } else {
      const response = await globalService.saveDocument(image);
      const updatedCompetitionData = {
        ...competitionData,
        logo: response.data,
      };
      await competitionService.saveCompetitionData(updatedCompetitionData);
      thunkAPI.dispatch(saveCompetitionSuccess(updatedCompetitionData));
      thunkAPI.dispatch(updateLoadingSpinner(false));
      thunkAPI.dispatch(
        toasterDashMessage({
          message: 'Competition Info has been saved',
          toasterType: 'success',
        })
      );
    }
  }
);
