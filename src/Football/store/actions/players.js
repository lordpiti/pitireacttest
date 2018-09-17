import axiosInstance from '../../utilities/axios-test';
import * as actionTypes from './actionTypes';
import * as globalActionCreators from './global';

export const loadPlayerListSuccess = (playerList) => {
    return {
        type: actionTypes.LOAD_PLAYER_LIST,
        payload: playerList
    };
};

export const filterPlayerList = (filter) => {
  return {
      type: actionTypes.FILTER_PLAYER_LIST,
      payload: filter
  };
};

export const loadPlayerSuccess = (playerData) => {
  return {
      type: actionTypes.LOAD_PLAYER,
      payload: playerData
  };
};

export const savePlayerSuccess = (playerData) => {
  return {
      type: actionTypes.SAVE_PLAYER,
      payload: playerData
  };
};

export const loadPlayerList = () => {
  return dispatch => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));
    axiosInstance.get('player').then( response => {
      const playerList = response.data.sort((a, b) => (a.name < b.name ? -1 : 1))
      dispatch(loadPlayerListSuccess(playerList));
      dispatch(globalActionCreators.updateLoadingSpinner(false));
    });
  }
};

export const loadPlayer = (id) => {
  
  return dispatch => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));
    axiosInstance.get(`player/${id}`).then( response => {
      dispatch(loadPlayerSuccess(response.data));
      dispatch(globalActionCreators.updateLoadingSpinner(false));
    });
  }
};

export const savePlayer = (image, playerData) => {

  return dispatch => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));

    if (!image) {
      axiosInstance.post(`player/savePlayerDetails`, playerData).then( response => {
        dispatch(savePlayerSuccess(playerData));
        dispatch(globalActionCreators.updateLoadingSpinner(false));
      });
    }
    else {

      axiosInstance.post('GlobalMedia/UploadBase64Image',
        { Base64String: image.data, FileName: image.fileName })
        .then(response => {
          const updatedPlayerData = { ...playerData, picture: response.data }
          axiosInstance.post(`player/savePlayerDetails`, updatedPlayerData).then( response => {
            dispatch(savePlayerSuccess(updatedPlayerData));
            dispatch(globalActionCreators.updateLoadingSpinner(false));
          });
        })
    }

  }
};