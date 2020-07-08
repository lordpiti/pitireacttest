import axiosInstance from '../utilities/axios-test';
import { AxiosResponse } from 'axios';

export class CompetitionService {
  public async loadCompetitionList(): Promise<AxiosResponse<any>> {
    return await axiosInstance.get('competition');
  }

  public async getCompetition(id: number): Promise<AxiosResponse<any>> {
    return await axiosInstance.get(`competition/${id}`);
  }

  public async getCompetitionRound(id: number, roundNumber: any) {
    return await axiosInstance.get(`competition/${id}/round/${roundNumber}`);
  }

  public async getCompetitionDraw(id: number) {
    return await axiosInstance.get(`competition/${id}/getDraw/`);
  }

  public async saveCompetitionData(
    competitionData: any
  ): Promise<AxiosResponse<any>> {
    return await axiosInstance.post(
      `competition/saveCompetitionDetails`,
      competitionData
    );
  }

  public async getCompetitionTeams(competitionId: number) {
    return await axiosInstance.get(`team/teams/${competitionId}`);
  }

  public async getCompetitionTeamEvolution(
    competitionId: number,
    teamId: number
  ) {
    return await axiosInstance.get(
      `team/clasification/${teamId}/competition/${competitionId}`
    );
  }

  public async getMatchInfo(matchId: number) {
    return await axiosInstance.get(`competition/match/${matchId}`);
  }
}
