import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { CompetitionsState } from './competitions.reducer';

const competitionsState = (state: RootState): CompetitionsState =>
  state.competitionsState;

export const getCompetitionList = createSelector(
  competitionsState,
  (slice) => slice.competitionList
);

export const getEvolutionDataToShow = createSelector(
  competitionsState,
  (slice) => {
    const evolutionData = slice.currentCompetition.evolutionData;
    return (
      evolutionData && {
        rounds: evolutionData.map((round: any) => round.round),
        positions: evolutionData.map((round: any) => round.position),
        goalsFor: evolutionData.map((round: any) => round.goalsFor),
        goalsAgainst: evolutionData.map((round: any) => round.goalsAgainst),
      }
    );
  }
);

export const getTeamsFromCurrentCompetition = createSelector(
  competitionsState,
  (slice) => slice.currentCompetition.teams
);

export const getCurrentCompetition = createSelector(
  competitionsState,
  (slice) => slice.currentCompetition
);

export const getCurrentCompetitionRounds = createSelector(
  competitionsState,
  (slice) => slice.currentCompetition?.roundData
);

export const getCurrentCompetitionDraw = createSelector(
  competitionsState,
  (slice) => slice.currentCompetition?.drawData
);

export const getCurrentMatch = createSelector(competitionsState, (slice) =>
  slice.currentMatch ? slice.currentMatch : null
);
