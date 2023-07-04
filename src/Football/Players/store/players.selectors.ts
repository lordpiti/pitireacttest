import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { PlayersState } from './players.reducer';

const playersState = (state: RootState): PlayersState => state.playersState;

export const getCurrentPlayer = createSelector(
  playersState,
  (slice) => slice.currentPlayer
);

export const getFilteredPlayers = createSelector(
  playersState,
  (slice) => slice.filteredPlayers
);

export const isLoading = createSelector(playersState, (slice) => slice.loading);
