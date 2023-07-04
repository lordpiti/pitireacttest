import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToasterInfo {
  message: string;
  open: boolean;
  toasterType?: any;
}

export interface GlobalState {
  loading: boolean;
  dash: ToasterInfo;
}

const INITIAL_STATE = {
  loading: false,
  dash: {
    message: '',
    open: false,
  },
} as GlobalState;

const globalReducer = createSlice({
  name: 'global',
  initialState: INITIAL_STATE,
  reducers: {
    updateLoadingSpinner: (state, { payload }: PayloadAction<any>) => {
      return {
        ...state,
        loading: payload,
      } as GlobalState;
    },
    toasterDashMessage: (state, { payload }: PayloadAction<any>) => {
      return {
        ...state,
        dash: {
          message: payload.message,
          open: true,
          toasterType: payload.toasterType,
        },
      } as GlobalState;
    },
    toasterDashClear: (state, { payload }: PayloadAction<any>) => {
      return {
        ...state,
        dash: {
          message: '',
          open: false,
          toasterType: state.dash.toasterType,
        },
      } as GlobalState;
    },
  },
});

export const { updateLoadingSpinner, toasterDashMessage, toasterDashClear } =
  globalReducer.actions;

export default globalReducer.reducer;
