import { Module } from '@nestjs/common';
import { RiotGamesModule } from '../riotGames/riot.games.module';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';

@Module({
  imports: [RiotGamesModule],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MatchesService],
})
export class MatchesModule {}
