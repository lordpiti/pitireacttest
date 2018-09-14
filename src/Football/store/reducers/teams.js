import * as actionTypes from '../actions/actionTypes';

const initialState = {
  currentTeam: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_TEAM_LIST:
      return {
        ...state,
        teamList: action.payload
      }
    default: break;
  }
  return state;
};

export default reducer;