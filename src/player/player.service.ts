import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateLeaderBoardDto } from '../leaderboard/dtos/create.leaderboard.dto';
import { LeaderBoardService } from '../leaderboard/leaderboard.service';
import { LeagueEntryInfo } from '../riotGames/interfaces/league.entry.interface';
import { QUEUE_ID } from '../riotGames/interfaces/queue.id.enum';
import { RIOT_GAMES_REGION_SHORT_ENUM } from '../riotGames/interfaces/riot.games.regions.enum';
import { RiotGamesService } from '../riotGames/riot.games.service';
import { PlayerSummaryQueryDto } from './dtos/player.summary.query.dto';

@Injectable()
export class PlayerService {
  constructor(
    private readonly riotGamesService: RiotGamesService,
    private readonly leaderBoardService: LeaderBoardService,
  ) {}

  /**
   * Get player summary info
   *
   * @param summoner
   * @param region
   * @param query
   * @returns
   */
  public async getPlayerSummaryInfo(
    summoner: string,
    region: RIOT_GAMES_REGION_SHORT_ENUM,
    query: PlayerSummaryQueryDto,
  ): Promise<LeagueEntryInfo[]> {
    try {
      const currentSummonerInfo =
        await this.riotGamesService.getSummonerInfoByName(summoner, region);

      if (!currentSummonerInfo) {
        throw new NotFoundException(`Current summoner info was not found`);
      }

      const leagueEntries =
        await this.riotGamesService.getLeagueEntriesBySummonerId(
          currentSummonerInfo.id,
          region,
          query.queue,
        );

      if (leagueEntries.length > 0) {
        for (const leagueEntry of leagueEntries) {
          const leaderBoardEntity: CreateLeaderBoardDto = {
            leaguePoints: leagueEntry.leaguePoints,
            winRate: (leagueEntry.wins / leagueEntry.losses) * 100,
            name: currentSummonerInfo.name,
            region,
            queueId: QUEUE_ID[leagueEntry.queueType],
          };

          await this.leaderBoardService.createOrUpdate(leaderBoardEntity);
        }

        // save for queueId = ALL

        const leaguePoints = leagueEntries.reduce(
          (acc, val) => (acc += val.leaguePoints),
          0,
        );

        const wins = leagueEntries.reduce((acc, val) => (acc += val.wins), 0);

        const losses = leagueEntries.reduce(
          (acc, val) => (acc += val.losses),
          0,
        );

        await this.leaderBoardService.createOrUpdate({
          leaguePoints,
          winRate: (wins / losses) * 100,
          name: currentSummonerInfo.name,
          region,
          queueId: QUEUE_ID.ALL,
        });
      }

      return leagueEntries;
    } catch (error) {
      throw new HttpException(
        `Error trying to get player summary info. Error message: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
