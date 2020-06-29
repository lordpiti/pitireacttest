import axiosInstance from '../utilities/axios-test';
import { AxiosResponse } from 'axios';

export interface TeamData {
  city: string;
  id: number;
  name: string;
  pictureLogo: ImageContent;
  playerList: any;
  stadium: any;
}

export interface ImageContent {
  id: number;
  bytes: any;
  base64String: string;
  fileName: string;
  url: string;
}

export class TeamsService {
  public async loadTeamList(): Promise<AxiosResponse<TeamData[]>> {
    return await axiosInstance.get('team/teams');
  }

  public async loadTeam(id: number): Promise<AxiosResponse<any>> {
    return axiosInstance.get(`team/teams/${id}/year/2009/`);
  }

  public async saveTeamData(teamData: any): Promise<AxiosResponse<any>> {
    return await axiosInstance.post(`team/saveTeamDetails`, teamData);
  }
}
