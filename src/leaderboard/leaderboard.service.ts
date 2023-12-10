import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { QUEUE_ID } from '../riotGames/interfaces/queue.id.enum';
import { RIOT_GAMES_REGION_SHORT_ENUM } from '../riotGames/interfaces/riot.games.regions.enum';
import { CreateLeaderBoardDto } from './dtos/create.leaderboard.dto';
import { LeaderBoardTopStatistics } from './interfaces/leaderboard.top.statistics.interface';
import { LeaderBoardEntity } from './leaderboard.entity';
import { LeaderBoardRepository } from './leaderboard.repository';

@Injectable()
export class LeaderBoardService {
  constructor(
    @InjectRepository(LeaderBoardEntity)
    private readonly leaderBoardRepository: LeaderBoardRepository,
  ) {}

  /**
   * Return the leaderBoard info by summoner name and region
   *
   * @param summonerName
   * @param region
   * @returns
   */
  public async findByFilter(
    summonerName: string,
    region: RIOT_GAMES_REGION_SHORT_ENUM,
    queueId: QUEUE_ID,
  ): Promise<LeaderBoardEntity> {
    const leaderBoardDoc = await this.leaderBoardRepository.findByFilter(
      summonerName,
      region,
      queueId,
    );

    if (!leaderBoardDoc) {
      throw new NotFoundException(
        `LeaderBoard info was not found for name: ${summonerName} and region: ${region}`,
      );
    }

    return leaderBoardDoc;
  }

  /**
   * Get top statistics for summoner
   *
   * @param summonerName
   * @param region
   * @returns
   */
  public async getTopStatisticsForSummoner(
    summonerName: string,
    region: RIOT_GAMES_REGION_SHORT_ENUM,
    queueId: QUEUE_ID,
  ): Promise<LeaderBoardTopStatistics> {
    try {
      const currentLeaderBoardInfo = await this.findByFilter(
        summonerName,
        region,
        queueId,
      );

      return await this.leaderBoardRepository.getTopStatisticsForSummoner(
        currentLeaderBoardInfo,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Create leaderBoard entity
   *
   * @param dto
   * @returns
   */
  async createOrUpdate(dto: CreateLeaderBoardDto): Promise<LeaderBoardEntity> {
    try {
      return await this.leaderBoardRepository.createOrUpdateLeaderBoardEntity(
        dto,
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}
