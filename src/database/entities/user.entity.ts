import {
    Column,
    PrimaryColumn,
    Entity
} from 'typeorm';
import { Pot } from './pot.entity';

@Entity({ name: 'Users' })
export class User {
    @PrimaryColumn({ name: 'address' })
    public address: string;

    @Column({ name: 'email' })
    public email: string;
}
