import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ObjectID,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'pots' })
export class Pot {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  public id: ObjectID;

  @Column()
  public winnerAddress: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;
}
