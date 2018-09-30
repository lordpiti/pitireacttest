import * as actionTypes from '../actions/actionTypes';

const initialState = {

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
      let teamsCopy = [...state.currentCompetition.teams];
      let teamsWithSelected = teamsCopy.map(team => {
        team.selected = team.id == action.payload.teamId;
        return team;
      });

      return {
        ...state,
        currentCompetition: {
          ...state.currentCompetition,
          teams: teamsWithSelected,
          evolutionData: createDataToShow(action.payload.chartData)
        }
      }
    case actionTypes.LOAD_COMPETITION_LIST:
      return {
        ...state,
        competitionList: action.payload
      }
    case actionTypes.LOAD_MATCH_INFO:
      return {
        ...state,
        currentMatch: action.payload
      }
    case actionTypes.LOAD_COMPETITION:
      return {
          ...state,
          currentCompetition: action.payload
      }
    case actionTypes.SAVE_COMPETITION:
      return {
          ...state,
          currentCompetition: action.payload
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