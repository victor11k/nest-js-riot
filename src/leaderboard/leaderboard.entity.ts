import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { QUEUE_ID } from '../riotGames/interfaces/queue.id.enum';
import { RIOT_GAMES_REGION_SHORT_ENUM } from '../riotGames/interfaces/riot.games.regions.enum';

@Unique(['name', 'region', 'queueId'])
@Entity()
export class LeaderBoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'enum', enum: RIOT_GAMES_REGION_SHORT_ENUM })
  region: RIOT_GAMES_REGION_SHORT_ENUM;

  @Column({ type: 'enum', enum: QUEUE_ID })
  queueId: QUEUE_ID;

  @Column({ type: 'numeric' })
  leaguePoints: number;

  @Column({ type: 'numeric' })
  winRate: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
