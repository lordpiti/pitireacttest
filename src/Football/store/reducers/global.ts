import * as actionTypes from '../actions/actionTypes';

interface ToasterInfo {
  message: string;
  open: boolean;
  toasterType?: any;
}

interface GlobalState {
  loading: boolean;
  dash: ToasterInfo;
}

const initialState = {
  loading: false,
  dash: {
    message: '',
    open: false,
  },
} as GlobalState;

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.UPDATE_LOADING_SPINNER:
      return {
        ...state,
        loading: action.payload,
      } as GlobalState;
    case actionTypes.TOAST_DASH_MESSAGE:
      return {
        ...state,
        dash: {
          message: action.payload,
          open: true,
          toasterType: action.toasterType,
        },
      } as GlobalState;
    case actionTypes.TOAST_DASH_CLEAR:
      return {
        ...state,
        dash: {
          message: '',
          open: false,
          toasterType: state.dash.toasterType,
        },
      };

    default:
      break;
  }
  return state;
};

export default reducer;
