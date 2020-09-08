import * as actionTypes from './actionTypes';
import * as globalActionCreators from './globalActions';
import Formatters from '../../utilities/formatters';
import { FootballDispatch, FootballThunk } from '../../store';

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

export const loadPlayerListAction = (): FootballThunk => {
  return async (dispatch: FootballDispatch, _, { playerService }) => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));

    const playersListResponse = await playerService.loadPlayerList();
    const playerList = playersListResponse.data.sort((a: any, b: any) =>
      a.surname < b.surname ? -1 : 1
    );
    dispatch(loadPlayerListSuccessAction(playerList));
    dispatch(globalActionCreators.updateLoadingSpinner(false));
  };
};

export const loadPlayerAction = (id: any): FootballThunk => {
  return async (dispatch: FootballDispatch, _, { playerService }) => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));

    const { data: playerData } = await playerService.loadPlayer(id);

    playerData.birthDate = Formatters.formatDateWithDashes(
      playerData.birthDate
    );
    dispatch(loadPlayerSuccessAction(playerData));
    dispatch(globalActionCreators.updateLoadingSpinner(false));
  };
};

export const savePlayerAction = (
  image: any,
  playerData: any
): FootballThunk => {
  return async (
    dispatch: FootballDispatch,
    _,
    { playerService, globalService }
  ) => {
    dispatch(globalActionCreators.updateLoadingSpinner(true));

    if (!image) {
      const playerResponse = await playerService.savePlayerData(playerData);

      dispatch(savePlayerSuccessAction(playerData));
      dispatch(globalActionCreators.updateLoadingSpinner(false));
      dispatch(
        globalActionCreators.acToastDashMessage(
          'Player Info has been saved',
          'success'
        )
      ); //success, warning, error or info
    } else {
      const response = await globalService.saveImage(image);

      const updatedPlayerData = { ...playerData, picture: response.data };

      const playerResponse = await playerService.savePlayerData(
        updatedPlayerData
      );

      dispatch(savePlayerSuccessAction(updatedPlayerData));
      dispatch(globalActionCreators.updateLoadingSpinner(false));
      dispatch(
        globalActionCreators.acToastDashMessage(
          'Player Info has been saved',
          'success'
        )
      ); //success, warning, error or info
    }
  };
};
