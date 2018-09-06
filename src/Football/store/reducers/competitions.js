import * as actionTypes from '../actions/actionTypes';

const initialState = {
  currentCompetition: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_COMPETITION_TEAMS:
      return {
        ...state,
        currentCompetition: {
          ...state.currentCompetition,
          teams: action.payload
        }
      }
    case actionTypes.LOAD_COMPETITION_TEAM_EVOLUTION:
      return {
        ...state,
        currentCompetition: {
          ...state.currentCompetition,
          evolutionData: createDataToShow(action.payload)
        }
      }
    default: break;
  }
  return state;
};

const createDataToShow = (teamData) => {
  const dataToShow = {
    rounds: teamData.map(round => round.round),
    positions: teamData.map(round => round.position),
    goalsFor: teamData.map(round => round.goalsFor),
    goalsAgainst: teamData.map(round => round.goalsAgainst)
  }

  return dataToShow;
}

export default reducer;