import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ObjectID,
} from 'typeorm';
@Entity({ name: 'Pots' })
export class Pot {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  public _id: ObjectID;

  @Column({ name: 'winner_address', nullable: true })
  public winnerAddress: string;

  @Column({ name: 'is_reward_claimed', nullable: true })
  public isRewardClaimed: boolean;

  @Column('text', { array: true, name: 'player_ids' })
  public players:  string[]

  @Column({name: 'start_countdown_time', nullable: true})
  public startCountdownTime: Date;
}
