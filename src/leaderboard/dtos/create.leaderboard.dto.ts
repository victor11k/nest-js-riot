import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { QUEUE_ID } from '../../riotGames/interfaces/queue.id.enum';
import { RIOT_GAMES_REGION_SHORT_ENUM } from '../../riotGames/interfaces/riot.games.regions.enum';

export class CreateLeaderBoardDto {
  @IsString()
  name: string;

  @IsEnum(RIOT_GAMES_REGION_SHORT_ENUM)
  region: RIOT_GAMES_REGION_SHORT_ENUM;

  @IsNumber()
  leaguePoints: number;

  @IsNumber()
  winRate: number;

  @IsEnum(QUEUE_ID)
  @Transform(({ value }) => Number(value))
  queueId: QUEUE_ID;
}
