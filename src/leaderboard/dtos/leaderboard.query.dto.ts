import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { QUEUE_ID } from '../../riotGames/interfaces/queue.id.enum';

export class LeaderBoardQueryDto {
  @IsOptional()
  @IsEnum(QUEUE_ID)
  @Transform(({ value }) => Number(value))
  queue?: QUEUE_ID = QUEUE_ID.ALL;
}
