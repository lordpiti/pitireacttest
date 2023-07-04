import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TeamsState {
  teamList: any[];
  currentTeam: any;
}

const INITIAL_STATE = {
  teamList: [],
  currentTeam: null,
} as TeamsState;

const teamsReducer = createSlice({
  name: 'teams',
  initialState: INITIAL_STATE,
  reducers: {
    loadTeamListSuccess: (state, { payload }: PayloadAction<any>) => {
      return {
        ...state,
        teamList: payload,
      } as TeamsState;
    },
    loadTeamSuccess: (state, { payload }: PayloadAction<any>) => {
      return {
        ...state,
        currentTeam: payload,
      };
    },
    clearTeamData: (state, { payload }: PayloadAction<any>) => {
      return {
        ...state,
        currentTeam: null,
      };
    },
    saveTeamSuccess: (state, { payload }: PayloadAction<any>) => {
      return {
        ...state,
        currentTeam: payload,
      };
    },
  },
});

export const {
  loadTeamListSuccess,
  loadTeamSuccess,
  clearTeamData,
  saveTeamSuccess,
} = teamsReducer.actions;

export default teamsReducer.reducer;
