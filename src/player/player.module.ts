import { Module } from '@nestjs/common';
import { LeaderBoardModule } from '../leaderboard/leaderboard.module';
import { RiotGamesModule } from '../riotGames/riot.games.module';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
  imports: [RiotGamesModule, LeaderBoardModule],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
