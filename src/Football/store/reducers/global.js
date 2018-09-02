import * as actionTypes from '../actions/actions';

const initialState = {
    loading: false
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
      case actionTypes.UPDATE_LOADING_SPINNER:
          
          return {
              ...state,
              loading: action.payload 
          }
      default: break;
    }
    return state;
};

export default reducer;