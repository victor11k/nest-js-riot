import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
  Validate,
} from 'class-validator';
import { TimestampValidator } from '../../general/validators/timestamp.validator';
import { QUEUE_ID } from '../interfaces/queue.id.enum';

export class RecentMatchesQueryDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @Validate(TimestampValidator)
  startTime?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @Validate(TimestampValidator)
  endTime?: number;

  @IsOptional()
  @IsEnum(QUEUE_ID)
  @Transform(({ value }) => Number(value))
  queue?: QUEUE_ID;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  start?: number = 0;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Max(20)
  @Transform(({ value }) => Number(value))
  count?: number = 20;
}
