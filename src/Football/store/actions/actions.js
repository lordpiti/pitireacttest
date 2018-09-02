import axiosInstance from '../../utilities/axios-test';

export const LOAD_PLAYER_LIST = 'LOAD_PLAYER_LIST';
export const FILTER_PLAYER_LIST = 'FILTER_PLAYER_LIST';
export const LOAD_PLAYER = 'LOAD_PLAYER';
export const SAVE_PLAYER = 'SAVE_PLAYER';
export const UPDATE_LOADING_SPINNER = 'UPDATE_LOADING_SPINNER';

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

export const savePlayerSuccess = (playerData) => {
  return {
      type: SAVE_PLAYER,
      payload: playerData
  };
};

export const loadPlayerList = () => {
  return dispatch => {
    dispatch(updateLoadingSpinner(true));
    axiosInstance.get('player').then( response => {
      const playerList = response.data.sort((a, b) => (a.name < b.name ? -1 : 1))
      dispatch(loadPlayerListSuccess(playerList));
      dispatch(updateLoadingSpinner(false));
    });
  }
};

export const loadPlayer = (id) => {
  
  return dispatch => {
    dispatch(updateLoadingSpinner(true));
    axiosInstance.get(`player/${id}`).then( response => {
      dispatch(loadPlayerSuccess(response.data));
      dispatch(updateLoadingSpinner(false));
    });
  }
};

export const savePlayer = (image, playerData) => {

  return dispatch => {
    dispatch(updateLoadingSpinner(true));

    if (!image) {
      axiosInstance.post(`player/savePlayerDetails`, playerData).then( response => {
        dispatch(savePlayerSuccess(playerData));
      });
    }
    else {

      axiosInstance.post('GlobalMedia/UploadBase64Image',
        { Base64String: image.data, FileName: image.fileName })
        .then(response => {
          const updatedPlayerData = { ...playerData, picture: response.data }
          axiosInstance.post(`player/savePlayerDetails`, updatedPlayerData).then( response => {
            dispatch(savePlayerSuccess(updatedPlayerData));
            dispatch(updateLoadingSpinner(false));
          });
        })
    }

  }
};

export const updateLoadingSpinner = (isLoading) => {
  return {
      type: UPDATE_LOADING_SPINNER,
      payload: isLoading
  };
};