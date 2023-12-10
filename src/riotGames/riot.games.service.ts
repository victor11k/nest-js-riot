import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { getKeyByValue } from '../general/utils/utils';
import { RecentMatchesQueryDto } from './dtos/recent.matchers.query.dto';
import { LeagueEntryInfo } from './interfaces/league.entry.interface';
import { QUEUE_ID } from './interfaces/queue.id.enum';
import { RawMatchInfo } from './interfaces/raw.match.info.interface';
import { RIOT_GAMES_REGION_SHORT_ENUM } from './interfaces/riot.games.regions.enum';
import { SummonerInfoInterface } from './interfaces/summoner.info.interface';

@Injectable()
export class RiotGamesService implements OnModuleInit {
  private axiosInstance: AxiosInstance = null;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const apiKey = this.configService.get('riotGames.apiKey');

    this.axiosInstance = axios.create({
      headers: {
        'X-Riot-Token': apiKey,
      },
    });
  }

  /**
   * Returns the summoner info by provided name
   *
   * @param summonerName
   * @returns
   */
  public async getSummonerInfoByName(
    summonerName: string,
    region: RIOT_GAMES_REGION_SHORT_ENUM,
  ): Promise<SummonerInfoInterface> {
    try {
      const endpointUrl = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;

      const summonerInfo =
        await this.axiosInstance.get<SummonerInfoInterface>(endpointUrl);

      return summonerInfo.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Returns the summoner info by provided name
   *
   * @param summonerName
   * @returns
   */
  public async getLeagueEntriesBySummonerId(
    summonerId: string,
    region: RIOT_GAMES_REGION_SHORT_ENUM,
    queueId?: QUEUE_ID,
  ): Promise<LeagueEntryInfo[]> {
    try {
      const endpointUrl = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`;

      let { data: leagueEntries } =
        await this.axiosInstance.get<LeagueEntryInfo[]>(endpointUrl);

      if (queueId) {
        const queueType = getKeyByValue(queueId, QUEUE_ID);
        leagueEntries = leagueEntries.filter(
          (league) => league.queueType === queueType,
        );
      }

      return leagueEntries;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Returns the matches ids list by Puuid
   *
   * @param puuid
   * @param query
   * @returns
   */
  public async getMatchesIdsListByPuuid(
    puuid: string,
    query: RecentMatchesQueryDto,
  ): Promise<string[]> {
    try {
      const urlLink = new URL(
        `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids`,
      );

      for (const [queryParam, value] of Object.entries(query)) {
        if (queryParam && value !== undefined) {
          urlLink.searchParams.append(queryParam, value);
        }
      }

      const matchesIdsList = await this.axiosInstance.get<string[]>(
        urlLink.toString(),
      );

      return matchesIdsList.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Get match info by match Id
   * @param matchId
   * @returns
   */
  public async getMatchInfoByMatchId(matchId: string): Promise<RawMatchInfo> {
    try {
      const rawMatchInfo = await this.axiosInstance.get<RawMatchInfo>(
        `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`,
      );

      return rawMatchInfo.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
