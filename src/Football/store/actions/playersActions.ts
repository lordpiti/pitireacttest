import axiosInstance from '../../utilities/axios-test';
import * as actionTypes from './actionTypes';
import * as globalActionCreators from './global';
import Formatters from '../../utilities/formatters';
import { FootballDispatch } from '../../..';

export const loadPlayerListSuccessAction = (playerList: any) => {
  return {
    type: actionTypes.LOAD_PLAYER_LIST,
    payload: playerList,
  };
};

export const filterPlayerListAction = (filter: any) => {
  return {
    type: actionTypes.FILTER_PLAYER_LIST,
    payload: filter,
  };
};

export const loadPlayerSuccessAction = (playerData: any) => {
  return {
    type: actionTypes.LOAD_PLAYER,
    payload: playerData,
  };
};

export const savePlayerSuccessAction = (playerData: any) => {
  return {
    type: actionTypes.SAVE_PLAYER,
    payload: playerData,
  };
};

export const loadPlayerListAction = () => {
  return (dispatch: FootballDispatch) => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));
    axiosInstance.get('player').then((response) => {
      const playerList = response.data.sort((a: any, b: any) =>
        a.surname < b.surname ? -1 : 1
      );
      dispatch(loadPlayerListSuccessAction(playerList));
      dispatch(globalActionCreators.updateLoadingSpinner(false));
    });
  };
};

export const loadPlayerAction = (id: any) => {
  return (dispatch: FootballDispatch) => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));
    axiosInstance.get(`player/${id}`).then((response) => {
      let playerData = response.data;

      playerData.birthDate = Formatters.formatDateWithDashes(
        playerData.birthDate
      );
      dispatch(loadPlayerSuccessAction(response.data));
      dispatch(globalActionCreators.updateLoadingSpinner(false));
    });
  };
};

export const savePlayerAction = (image: any, playerData: any) => {
  return (dispatch: FootballDispatch) => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));

    if (!image) {
      axiosInstance
        .post(`player/savePlayerDetails`, playerData)
        .then((response) => {
          dispatch(savePlayerSuccessAction(playerData));
          dispatch(globalActionCreators.updateLoadingSpinner(false));
          dispatch(
            globalActionCreators.acToastDashMessage(
              'Player Info has been saved',
              'success'
            )
          ); //success, warning, error or info
        });
    } else {
      axiosInstance
        .post('GlobalMedia/UploadBase64Image', {
          Base64String: image.data,
          FileName: image.fileName,
        })
        .then((response) => {
          const updatedPlayerData = { ...playerData, picture: response.data };
          axiosInstance
            .post(`player/savePlayerDetails`, updatedPlayerData)
            .then((response) => {
              dispatch(savePlayerSuccessAction(updatedPlayerData));
              dispatch(globalActionCreators.updateLoadingSpinner(false));
              dispatch(
                globalActionCreators.acToastDashMessage(
                  'Player Info has been saved',
                  'success'
                )
              ); //success, warning, error or info
            });
        });
    }
  };
};
