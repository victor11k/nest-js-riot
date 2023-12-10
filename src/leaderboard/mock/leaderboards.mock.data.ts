import { QUEUE_ID } from '../../riotGames/interfaces/queue.id.enum';
import { RIOT_GAMES_REGION_SHORT_ENUM } from '../../riotGames/interfaces/riot.games.regions.enum';
import { CreateLeaderBoardDto } from '../dtos/create.leaderboard.dto';

export const leaderBoardsMockData: CreateLeaderBoardDto[] = [
  {
    leaguePoints: 10,
    name: 'Test-1',
    region: RIOT_GAMES_REGION_SHORT_ENUM.NA1,
    winRate: 5,
    queueId: QUEUE_ID.ALL,
  },
  {
    leaguePoints: 5,
    name: 'Test-2',
    region: RIOT_GAMES_REGION_SHORT_ENUM.NA1,
    queueId: QUEUE_ID.ALL,
    winRate: 2.5,
  },
  {
    leaguePoints: 2.5,
    name: 'Test-3',
    region: RIOT_GAMES_REGION_SHORT_ENUM.NA1,
    queueId: QUEUE_ID.ALL,
    winRate: 1.25,
  },
  {
    leaguePoints: 15,
    name: 'Test-3',
    region: RIOT_GAMES_REGION_SHORT_ENUM.EUN1,
    queueId: QUEUE_ID.ALL,
    winRate: 10,
  },
];
