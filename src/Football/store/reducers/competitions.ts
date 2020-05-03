import * as actionTypes from '../actions/actionTypes';

export interface CompetitionsState {
  competitionList: any[];
  currentCompetition?: any;
  currentMatch?: any;
}

const initialState = {
  competitionList: [],
} as CompetitionsState;

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.LOAD_COMPETITION_TEAMS:
      return {
        ...state,
        currentCompetition: {
          ...state.currentCompetition,
          teams: action.payload,
        },
      } as CompetitionsState;
    case actionTypes.LOAD_COMPETITION_TEAM_EVOLUTION:
      let teamsCopy = [...state.currentCompetition.teams];
      let teamsWithSelected = teamsCopy.map((team) => {
        team.selected = team.id == action.payload.teamId;
        return team;
      });

      return {
        ...state,
        currentCompetition: {
          ...state.currentCompetition,
          teams: teamsWithSelected,
          evolutionData: createDataToShow(action.payload.chartData),
        },
      } as CompetitionsState;
    case actionTypes.LOAD_COMPETITION_LIST:
      return {
        ...state,
        competitionList: action.payload,
      } as CompetitionsState;
    case actionTypes.LOAD_MATCH_INFO:
      return {
        ...state,
        currentMatch: action.payload,
      } as CompetitionsState;
    case actionTypes.LOAD_COMPETITION:
      return {
        ...state,
        currentCompetition: action.payload,
      } as CompetitionsState;
    case actionTypes.SAVE_COMPETITION:
      return {
        ...state,
        currentCompetition: action.payload,
      } as CompetitionsState;
    default:
      break;
  }
  return state;
};

const createDataToShow = (teamData: any) => {
  const dataToShow = {
    rounds: teamData.map((round: any) => round.round),
    positions: teamData.map((round: any) => round.position),
    goalsFor: teamData.map((round: any) => round.goalsFor),
    goalsAgainst: teamData.map((round: any) => round.goalsAgainst),
  };

  return dataToShow;
};

export default reducer;
