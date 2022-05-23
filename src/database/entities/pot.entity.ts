import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ObjectID,
} from 'typeorm';
import { User } from './user.entity';
@Entity({ name: 'Pots' })
export class Pot {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  public id: ObjectID;

  @Column({ name: 'winner_address' })
  public winnerAddress: string;

  @Column({ name: 'is_reward_claimed' })
  public isRewardClaimed: boolean;

  @OneToMany(type => User, player => player.address)
  public players:  User[]

  @Column({name: 'start_countdown_time'})
  public startCountdownTime: Date;
}
