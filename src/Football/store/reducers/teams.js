import * as actionTypes from '../actions/actionTypes';

const initialState = {

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_TEAM_LIST:
      return {
        ...state,
        teamList: action.payload
      }
    case actionTypes.LOAD_TEAM:
      return {
          ...state,
          currentTeam: action.payload
      }
    case actionTypes.SAVE_TEAM:
      return {
          ...state,
          currentTeam: action.payload
      }
    default: break;
  }
  return state;
};

export default reducer;