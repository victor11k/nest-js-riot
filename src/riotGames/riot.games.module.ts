import { Module } from '@nestjs/common';
import { RiotGamesService } from './riot.games.service';

@Module({
  providers: [RiotGamesService],
  exports: [RiotGamesService],
})
export class RiotGamesModule {}
