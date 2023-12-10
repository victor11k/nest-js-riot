import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RiotGamesService } from './riotGames/riot.games.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly riotGamesService: RiotGamesService,
  ) {}

  @Get()
  async getHello() {}
}
