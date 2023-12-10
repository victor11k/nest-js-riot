import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { LeaderBoardEntity } from './leaderboard/leaderboard.entity';
import { LeaderBoardModule } from './leaderboard/leaderboard.module';
import { MatchesModule } from './matches/matches.module';
import { PlayerModule } from './player/player.module';
import { RiotGamesModule } from './riotGames/riot.games.module';

@Module({
  imports: [
    // CacheModule.register({
    //   isGlobal: true,
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        RIOT_GAMES_API_KEY: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_DB: Joi.string().required(),
      }),
      validationOptions: {
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [LeaderBoardEntity],
        synchronize: true,
      }),
    }),
    RiotGamesModule,
    LeaderBoardModule,
    MatchesModule,
    PlayerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
