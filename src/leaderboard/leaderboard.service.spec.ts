import { Test, TestingModule } from '@nestjs/testing';
import { LeaderBoardService } from './leaderboard.service';
import { leaderBoardsMockData } from './mock/leaderboards.mock.data';

describe('LeaderBoardService', () => {
  let service: LeaderBoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaderBoardService],
    }).compile();

    service = module.get<LeaderBoardService>(LeaderBoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should insert mock data successfully', async () => {
    for (const leaderBoardMockData of leaderBoardsMockData) {
      const data = await service.createOrUpdate(leaderBoardMockData);

      expect(data.name).toBe(leaderBoardMockData.name);
    }
  });

  it('Test-1 user NA1 should have top 1', async () => {
    const userInfo = await service.getTopStatisticsForSummoner(
      leaderBoardsMockData[0].name,
      leaderBoardsMockData[0].region,
      leaderBoardsMockData[0].queueId,
    );

    expect(userInfo.leaguePoints.top).toBe(1);
    expect(userInfo.winRate.top).toBe(1);
  });
});
