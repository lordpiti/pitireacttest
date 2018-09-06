import * as actionTypes from '../actions/actionTypes';

const initialState = {
    players: [],
    filteredPlayers: []
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
              filteredPlayers: playerList
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
      case actionTypes.LOAD_PLAYER:
          return {
              ...state,
              currentPlayer: action.payload
          }
      case actionTypes.SAVE_PLAYER:
          return {
              ...state,
              currentPlayer: action.payload
          }
      default: break;
    }
    return state;
};

export default reducer;