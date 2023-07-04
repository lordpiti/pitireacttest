import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { GlobalState } from './global.reducer';

const globalState = (state: RootState): GlobalState => state.globalState;

export const isLoading = createSelector(globalState, (slice) => slice.loading);

export const getDash = createSelector(globalState, (slice) => slice.dash);
