import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { RawMatchInfo } from '../riotGames/interfaces/raw.match.info.interface';
import { RIOT_GAMES_REGION_SHORT_ENUM } from '../riotGames/interfaces/riot.games.regions.enum';
import { RiotGamesService } from '../riotGames/riot.games.service';
import { RecentMatchesQueryDto } from './dtos/recent.matchers.query.dto';
import { RecentMatchesResponse } from './interfaces/recent.matches.response.interface';

@Injectable()
export class MatchesService {
  constructor(private readonly riotGamesService: RiotGamesService) {}

  /**
   * Get recent matches for summoner
   *
   * @param summoner
   * @param region
   * @param query
   * @returns
   */
  public async getRecentMatches(
    summoner: string,
    region: RIOT_GAMES_REGION_SHORT_ENUM,
    query: RecentMatchesQueryDto,
  ): Promise<RecentMatchesResponse> {
    try {
      const initialResponse: RecentMatchesResponse = {
        matches: [],
        page: query.page,
        size: query.size,
      };

      const currentSummonerInfo =
        await this.riotGamesService.getSummonerInfoByName(summoner, region);

      if (!currentSummonerInfo) {
        return initialResponse;
      }

      const matchesIds = await this.riotGamesService.getMatchesIdsListByPuuid(
        currentSummonerInfo.puuid,
        {
          endTime: query.endTime,
          queue: query.queue,
          startTime: query.startTime,
          count: query.size,
          start: query.page * query.size,
        },
      );

      if (!matchesIds || matchesIds.length === 0) {
        return initialResponse;
      }

      const matchesInfo: RawMatchInfo[] = [];

      for (const matchId of matchesIds) {
        const matchInfo =
          await this.riotGamesService.getMatchInfoByMatchId(matchId);

        matchesInfo.push(matchInfo);
      }

      initialResponse.matches = matchesInfo;

      return initialResponse;
    } catch (error) {
      throw new HttpException(
        `Error trying to get matches list. Error message: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
