import { Controller, Get, Param, Query } from '@nestjs/common';
import { LeagueEntryInfo } from '../riotGames/interfaces/league.entry.interface';
import { RIOT_GAMES_REGION_SHORT_ENUM } from '../riotGames/interfaces/riot.games.regions.enum';
import { PlayerSummaryQueryDto } from './dtos/player.summary.query.dto';
import { PlayerService } from './player.service';

@Controller('player-summary')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get('/:summoner/:region')
  public async getRecentMatches(
    @Param('summoner') summoner: string,
    @Param('region')
    region: RIOT_GAMES_REGION_SHORT_ENUM,
    @Query() query: PlayerSummaryQueryDto,
  ): Promise<LeagueEntryInfo[]> {
    return await this.playerService.getPlayerSummaryInfo(
      summoner,
      region,
      query,
    );
  }
}
