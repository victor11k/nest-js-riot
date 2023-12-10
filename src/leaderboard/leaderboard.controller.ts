import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RIOT_GAMES_REGION_SHORT_ENUM } from '../riotGames/interfaces/riot.games.regions.enum';
import { CreateLeaderBoardDto } from './dtos/create.leaderboard.dto';
import { LeaderBoardQueryDto } from './dtos/leaderboard.query.dto';
import { LeaderBoardTopStatistics } from './interfaces/leaderboard.top.statistics.interface';
import { LeaderBoardEntity } from './leaderboard.entity';
import { LeaderBoardService } from './leaderboard.service';

@Controller('leaderboard')
export class LeaderBoardController {
  constructor(private readonly leaderBoardService: LeaderBoardService) {}

  @Get('/:summoner/:region')
  public async getTopStatisticsForSummoner(
    @Param('summoner') summoner: string,
    @Param('region')
    region: RIOT_GAMES_REGION_SHORT_ENUM,
    @Query() query: LeaderBoardQueryDto,
  ): Promise<LeaderBoardTopStatistics> {
    return await this.leaderBoardService.getTopStatisticsForSummoner(
      summoner,
      region,
      query.queue,
    );
  }

  @Post('create')
  public async create(
    @Body() dto: CreateLeaderBoardDto,
  ): Promise<LeaderBoardEntity> {
    return await this.leaderBoardService.createOrUpdate(dto);
  }
}
