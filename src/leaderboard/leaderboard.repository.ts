import type { Repository } from 'typeorm';
import { MoreThan } from 'typeorm';
import { QUEUE_ID } from './../riotGames/interfaces/queue.id.enum';
import { RIOT_GAMES_REGION_SHORT_ENUM } from './../riotGames/interfaces/riot.games.regions.enum';
import { CreateLeaderBoardDto } from './dtos/create.leaderboard.dto';
import { LeaderBoardTopStatistics } from './interfaces/leaderboard.top.statistics.interface';
import { LeaderBoardEntity } from './leaderboard.entity';

export interface LeaderBoardRepository extends Repository<LeaderBoardEntity> {
  this: Repository<LeaderBoardEntity>;

  getTopStatisticsForSummoner(
    leaderBoardEntity: LeaderBoardEntity,
  ): Promise<LeaderBoardTopStatistics>;

  findByFilter(
    summonerName: string,
    region: RIOT_GAMES_REGION_SHORT_ENUM,
    queueId: QUEUE_ID,
  ): Promise<LeaderBoardEntity>;

  createOrUpdateLeaderBoardEntity(
    dto: CreateLeaderBoardDto,
  ): Promise<LeaderBoardEntity>;
}

export const leaderBoardRepositoryMethods: Pick<
  LeaderBoardRepository,
  | 'getTopStatisticsForSummoner'
  | 'findByFilter'
  | 'createOrUpdateLeaderBoardEntity'
> = {
  async getTopStatisticsForSummoner(
    this: Repository<LeaderBoardEntity>,
    leaderBoardEntity: LeaderBoardEntity,
  ) {
    const topByLeaguePoints = await this.countBy({
      region: leaderBoardEntity.region,
      leaguePoints: MoreThan(leaderBoardEntity.leaguePoints),
      queueId: leaderBoardEntity.queueId,
    });

    const topByWinRate = await this.countBy({
      region: leaderBoardEntity.region,
      queueId: leaderBoardEntity.queueId,
      winRate: MoreThan(leaderBoardEntity.winRate),
    });

    return {
      leaguePoints: {
        top: topByLeaguePoints + 1,
      },
      winRate: {
        top: topByWinRate + 1,
      },
      queueId: leaderBoardEntity.queueId,
    };
  },

  async findByFilter(
    this: Repository<LeaderBoardEntity>,
    summonerName: string,
    region: RIOT_GAMES_REGION_SHORT_ENUM,
    queueId: QUEUE_ID,
  ) {
    return await this.findOne({
      where: {
        name: summonerName,
        region,
        queueId,
      },
    });
  },

  async createOrUpdateLeaderBoardEntity(
    this: Repository<LeaderBoardEntity>,
    dto: CreateLeaderBoardDto,
  ) {
    const existedEntity = await this.findOne({
      where: {
        name: dto.name,
        region: dto.region,
        queueId: dto.queueId,
      },
    });

    const leaderBoardEntity = this.create(dto);

    if (existedEntity) {
      await this.update(
        {
          name: dto.name,
          region: dto.region,
          queueId: dto.queueId,
        },
        {
          winRate: dto.winRate,
          leaguePoints: dto.leaguePoints,
        },
      );

      return leaderBoardEntity;
    }

    return await this.save(leaderBoardEntity);
  },
};
