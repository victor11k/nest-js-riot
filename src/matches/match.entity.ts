import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Unique(['matchId', 'participantPuuid'])
@Entity()
export class LeaderBoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  matchId: string;

  @Column({ type: 'varchar', length: 100 })
  participantPuuid: string;

  @Column({ type: 'string', array: true })
  participants: string[];

  @Column({ type: 'numeric' })
  gameDuration: number;

  @Column({ type: 'varchar', length: 100 })
  platformId: string;

  @Column({ type: 'numeric' })
  queueId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
