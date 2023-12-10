import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Max, Validate } from 'class-validator';
import { TimestampValidator } from '../../general/validators/timestamp.validator';
import { QUEUE_ID } from '../../riotGames/interfaces/queue.id.enum';

export class RecentMatchesQueryDto {
  @IsOptional()
  @IsNumber()
  @Validate(TimestampValidator)
  @Transform(({ value }) => Number(value))
  startTime?: number;

  @IsOptional()
  @IsNumber()
  @Validate(TimestampValidator)
  @Transform(({ value }) => Number(value))
  endTime?: number;

  @IsOptional()
  @IsEnum(QUEUE_ID)
  @Transform(({ value }) => Number(value))
  queue?: QUEUE_ID;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  page?: number = 0;

  @IsOptional()
  @IsNumber()
  @Max(20)
  @Transform(({ value }) => Number(value))
  size?: number = 5;
}
