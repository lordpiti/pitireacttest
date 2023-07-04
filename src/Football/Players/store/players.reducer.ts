import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PlayersState {
  players: any[];
  filteredPlayers: any;
  currentPlayer?: any;
  loading?: boolean;
}

const INITIAL_STATE = {
  players: [],
  filteredPlayers: [],
} as PlayersState;

const playersReducer = createSlice({
  name: 'competitions',
  initialState: INITIAL_STATE,
  reducers: {
    loadPlayerListSuccess: (state, { payload }: PayloadAction<any>) => {
      const playerList = payload.map((item: any) => {
        return {
          id: item.playerId,
          name: `${item.name} ${item.surname}`,
          team: item.teamName,
        };
      });
      return {
        ...state,
        players: playerList,
        filteredPlayers: playerList,
      } as PlayersState;
    },
    filterPlayerListSuccess: (state, { payload }: PayloadAction<any>) => {
      let playerListFiltered = [...state.players];

      if (payload) {
        //filter to not distinguish between uppercase and lowercase
        playerListFiltered = state.players.filter((item) =>
          item.name.toUpperCase().includes(payload.toUpperCase())
        );
      }
      return {
        ...state,
        filteredPlayers: playerListFiltered,
      };
    },
    loadPlayerSuccess: (state, { payload }: PayloadAction<any>) => {
      return {
        ...state,
        currentPlayer: payload,
      };
    },
    savePlayerSuccess: (state, { payload }: PayloadAction<any>) => {
      return {
        ...state,
        currentPlayer: payload,
      };
    },
  },
});

export const {
  loadPlayerListSuccess,
  filterPlayerListSuccess,
  loadPlayerSuccess,
  savePlayerSuccess,
} = playersReducer.actions;

export default playersReducer.reducer;
