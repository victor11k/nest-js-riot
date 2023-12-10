import { Module } from '@nestjs/common';
import {
  TypeOrmModule,
  getDataSourceToken,
  getRepositoryToken,
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { LeaderBoardController } from './leaderboard.controller';
import { LeaderBoardEntity } from './leaderboard.entity';
import { leaderBoardRepositoryMethods } from './leaderboard.repository';
import { LeaderBoardService } from './leaderboard.service';

@Module({
  imports: [TypeOrmModule.forFeature([LeaderBoardEntity])],
  controllers: [LeaderBoardController],
  providers: [
    {
      provide: getRepositoryToken(LeaderBoardEntity),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        return dataSource
          .getRepository(LeaderBoardEntity)
          .extend(leaderBoardRepositoryMethods);
      },
    },
    LeaderBoardService,
  ],
  exports: [LeaderBoardService],
})
export class LeaderBoardModule {}
