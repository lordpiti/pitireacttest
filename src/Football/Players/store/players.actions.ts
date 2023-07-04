import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  toasterDashMessage,
  updateLoadingSpinner,
} from '../../Global/store/global.reducer';
import { GlobalService } from '../../services/globalService';
import { PlayersService } from '../../services/playersService';
import Formatters from '../../utilities/formatters';
import {
  loadPlayerListSuccess,
  loadPlayerSuccess,
  savePlayerSuccess,
} from './players.reducer';

const playersService = new PlayersService();
const globalService = new GlobalService();

export const loadPlayerList = createAsyncThunk(
  'players/loadPlayerList',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(updateLoadingSpinner(true));

    const playersListResponse = await playersService.loadPlayerList();
    const playerList = playersListResponse.data.sort((a: any, b: any) =>
      a.surname < b.surname ? -1 : 1
    );
    thunkAPI.dispatch(loadPlayerListSuccess(playerList));
    thunkAPI.dispatch(updateLoadingSpinner(false));
  }
);

export const loadPlayer = createAsyncThunk(
  'players/loadPlayer',
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(updateLoadingSpinner(true));

    const { data: playerData } = await playersService.loadPlayer(id);

    playerData.birthDate = Formatters.formatDateWithDashes(
      playerData.birthDate
    );
    thunkAPI.dispatch(loadPlayerSuccess(playerData));
    thunkAPI.dispatch(updateLoadingSpinner(false));
  }
);

export const savePlayer = createAsyncThunk(
  'competitions/loadCompetitionDraw',
  async ({ image, playerData }: { image: any; playerData: any }, thunkAPI) => {
    thunkAPI.dispatch(updateLoadingSpinner(true));

    if (!image) {
      await playersService.savePlayerData(playerData);

      thunkAPI.dispatch(savePlayerSuccess(playerData));
      thunkAPI.dispatch(updateLoadingSpinner(false));
      thunkAPI.dispatch(
        toasterDashMessage({
          message: 'Player Info has been saved',
          toasterType: 'success',
        })
      );
    } else {
      const response = await globalService.saveImage(image);

      const updatedPlayerData = { ...playerData, picture: response.data };

      await playersService.savePlayerData(updatedPlayerData);

      thunkAPI.dispatch(savePlayerSuccess(updatedPlayerData));
      thunkAPI.dispatch(updateLoadingSpinner(false));
      thunkAPI.dispatch(
        toasterDashMessage({
          message: 'Player Info has been saved',
          toasterType: 'success',
        })
      );
    }
  }
);
