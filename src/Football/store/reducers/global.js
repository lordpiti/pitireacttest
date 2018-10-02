import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  dash: {
    message: '',
    open: false
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_LOADING_SPINNER:

      return {
        ...state,
        loading: action.payload
      }
    case actionTypes.TOAST_DASH_MESSAGE:
      {
        return {
          ...state,
          dash: {
            message: action.payload,
            open: true,
            toasterType: action.toasterType
          }
        };
      }

    case actionTypes.TOAST_DASH_CLEAR:
      {
        return {
          ...state,
          dash: {
            message: "",
            open: false,
            toasterType: state.dash.toasterType
          }
        };
      }
    default: break;
  }
  return state;
};

export default reducer;