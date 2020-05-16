import axiosInstance from '../utilities/axios-test';
import { AxiosResponse } from 'axios';

export class PlayersService {
  public async loadPlayerList(): Promise<AxiosResponse<any>> {
    return await axiosInstance.get('player');
  }

  public async loadPlayer(id: number): Promise<AxiosResponse<any>> {
    return axiosInstance.get(`player/${id}`);
  }

  public async savePlayerData(playerData: any): Promise<AxiosResponse<any>> {
    return await axiosInstance.post(`player/savePlayerDetails`, playerData);
  }
}
