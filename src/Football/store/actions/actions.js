import axiosInstance from '../../utilities/axios-test';

export const LOAD_PLAYER_LIST = 'LOAD_PLAYER_LIST';
export const FILTER_PLAYER_LIST = 'FILTER_PLAYER_LIST';
export const LOAD_PLAYER = 'LOAD_PLAYER';

export const loadPlayerListSuccess = (playerList) => {
    return {
        type: LOAD_PLAYER_LIST,
        payload: playerList
    };
};

export const filterPlayerList = (filter) => {
  return {
      type: FILTER_PLAYER_LIST,
      payload: filter
  };
};

export const loadPlayerSuccess = (playerData) => {
  return {
      type: LOAD_PLAYER,
      payload: playerData
  };
};

export const loadPlayerList = () => {
  return dispatch => {
    axiosInstance.get('player').then( response => {
      const playerList = response.data.sort((a, b) => (a.name < b.name ? -1 : 1))
      dispatch(loadPlayerListSuccess(playerList));
    });
  }
};

export const loadPlayer = (id) => {
  return dispatch => {
    axiosInstance.get(`player/${id}`).then( response => {
      dispatch(loadPlayerSuccess(response.data));
    });
  }
};