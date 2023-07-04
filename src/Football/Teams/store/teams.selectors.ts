import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { TeamsState } from './teams.reducer';

const teamState = (state: RootState): TeamsState => state.teamsState;

export const getCurrentTeam = createSelector(
  teamState,
  (slice) => slice.currentTeam
);

export const getTeamList = createSelector(teamState, (slice) => slice.teamList);
