import { Controller, Get, Param, Query } from '@nestjs/common';
import { RIOT_GAMES_REGION_SHORT_ENUM } from '../riotGames/interfaces/riot.games.regions.enum';
import { RecentMatchesQueryDto } from './dtos/recent.matchers.query.dto';
import { MatchesService } from './matches.service';
import { RecentMatchesResponse } from './interfaces/recent.matches.response.interface';

@Controller('recent-matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get('/:summoner/:region')
  public async getRecentMatches(
    @Param('summoner') summoner: string,
    @Param('region')
    region: RIOT_GAMES_REGION_SHORT_ENUM,
    @Query() query: RecentMatchesQueryDto,
  ): Promise<RecentMatchesResponse> {
    return await this.matchesService.getRecentMatches(summoner, region, query);
  }
}
