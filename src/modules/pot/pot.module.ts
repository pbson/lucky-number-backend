import { Module } from '@nestjs/common';
import { PotController } from './pot.controller';
import { PotService } from './pot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pot as PotEntity } from '../../database/entities/pot.entity';
import { User as UserEntity } from '../../database/entities/user.entity';
@Module({
    imports: [
        TypeOrmModule.forFeature([PotEntity, UserEntity])
    ],
    controllers: [PotController],
    providers: [PotService],
})
export class PotModule {
    constructor(private potService: PotService) { }
}