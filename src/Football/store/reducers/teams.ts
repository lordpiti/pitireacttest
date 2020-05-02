import * as actionTypes from '../actions/actionTypes';

export interface TeamsState {
  teamList: any[];
  currentTeam: any;
}

const initialState = {
  teamList: [],
  currentTeam: null,
} as TeamsState;

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.LOAD_TEAM_LIST:
      return {
        ...state,
        teamList: action.payload,
      } as TeamsState;
    case actionTypes.LOAD_TEAM:
      return {
        ...state,
        currentTeam: action.payload,
      };
    case actionTypes.SAVE_TEAM:
      return {
        ...state,
        currentTeam: action.payload,
      };
    default:
      break;
  }
  return state;
};

export default reducer;
