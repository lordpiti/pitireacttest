import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CompetitionsState {
  competitionList: any[];
  currentCompetition?: any;
  currentMatch?: any;
}

const INITIAL_STATE = {
  competitionList: [],
} as CompetitionsState;

const competitionsReducer = createSlice({
  name: 'competitions',
  initialState: INITIAL_STATE,
  reducers: {
    loadCompetitionTeamsSuccess: (state, { payload }: PayloadAction<any>) => {
      return {
        ...state,
        currentCompetition: {
          ...state.currentCompetition,
          teams: payload,
        },
      } as CompetitionsState;
    },
    loadCompetitionTeamEvolutionSuccess: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      const teamsCopy = [...state.currentCompetition.teams];
      const teamsWithSelected = teamsCopy.map((team) => ({
        ...team,
        selected: team.id == payload.teamId,
      }));

      return {
        ...state,
        currentCompetition: {
          ...state.currentCompetition,
          teams: teamsWithSelected,
          evolutionData: payload.chartData,
        },
      } as CompetitionsState;
    },
    loadCompetitionListSuccess: (state, { payload }: PayloadAction<any>) => {
      return {
        ...state,
        competitionList: payload,
      } as CompetitionsState;
    },
    loadMatchInfoSuccess: (state, { payload }: PayloadAction<any>) => {
      return {
        ...state,
        currentMatch: payload,
      } as CompetitionsState;
    },
    loadCompetitionSuccess: (state, { payload }: PayloadAction<any>) => {
      return {
        ...state,
        currentCompetition: payload,
      } as CompetitionsState;
    },
    saveCompetitionSuccess: (state, { payload }: PayloadAction<any>) => {
      return {
        ...state,
        currentCompetition: payload,
      } as CompetitionsState;
    },
    loadCompetitionRoundSuccess: (state, { payload }: PayloadAction<any>) => {
      return {
        ...state,
        currentCompetition: {
          ...state.currentCompetition,
          roundData: payload,
        },
      } as CompetitionsState;
    },
    loadCompetitionDrawSuccess: (state, { payload }: PayloadAction<any>) => {
      return {
        ...state,
        currentCompetition: {
          ...state.currentCompetition,
          drawData: payload,
        },
      } as CompetitionsState;
    },
  },
});

export const {
  loadCompetitionTeamsSuccess,
  loadCompetitionTeamEvolutionSuccess,
  loadCompetitionListSuccess,
  loadMatchInfoSuccess,
  loadCompetitionSuccess,
  saveCompetitionSuccess,
  loadCompetitionRoundSuccess,
  loadCompetitionDrawSuccess,
} = competitionsReducer.actions;

export default competitionsReducer.reducer;
