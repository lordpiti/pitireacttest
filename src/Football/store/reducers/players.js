import * as actionTypes from '../actions/actions';

const initialState = {
    players: [],
    filteredPlayers: [],
    loading: true
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
      case actionTypes.LOAD_PLAYER_LIST:
          const playerList = action.payload.map(item =>  { 
            return {
              id: item.playerId,
              name: item.name + ' '+item.surname,
              team: item.teamName 
            }
          });
          return {
              ...state,
              players: playerList,
              filteredPlayers: playerList,
              loading: false
          }
      case actionTypes.FILTER_PLAYER_LIST:
          let playerListFiltered = [...state.players];

          if (action.payload) {
            //filter to not distinguish between uppercase and lowercase
            playerListFiltered = state.players
              .filter(item => item.name.toUpperCase().includes(action.payload.toUpperCase()))
          }
          return {
              ...state,
              filteredPlayers: playerListFiltered
          }
      default: break;
    }
    return state;
};

export default reducer;