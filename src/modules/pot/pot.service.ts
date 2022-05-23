import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pot as PotEntity } from '../../database/entities/pot.entity';
import { UpdatePotDto } from './dto/update-pot.dto';
@Injectable()
export class PotService {
    constructor(
        @InjectRepository(PotEntity)
        private potRepository: Repository<PotEntity>,
    ) { }

    async getPotById(id: string) {
        try {
            return this.potRepository.findOne(id);
        } catch (error) {
            throw new HttpException({
                message: error.message
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async createPot() {
        try {
            return this.potRepository.save({
                winnerAddress: null,
                isRewardClaimed: null,
                players: [],
                startCountdownTime: null
            });
        } catch (error) {
            throw new HttpException({
                message: error.message
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async updatePot(updatedPot: UpdatePotDto) {
        console.log(updatedPot)
        const pot = await this.potRepository.findOne({
            where: { _id: updatedPot.id },
        });

        if (!pot) {
            throw new HttpException({
                message: 'Pot not found'
            }, HttpStatus.BAD_REQUEST);
        }

        try {
            return await this.potRepository.save({
                id: updatedPot.id,
                winnerAddress: updatedPot.winnerAddress
                    ? updatedPot.winnerAddress
                    : pot.winnerAddress,
                isRewardClaimed: updatedPot.isRewardClaimed
                    ? updatedPot.isRewardClaimed
                    : pot.isRewardClaimed,
                players: updatedPot.players
                    ? updatedPot.players
                    : pot.players,
                startCountdownTime: updatedPot.startCountdownTime
                    ? updatedPot.startCountdownTime
                    : pot.startCountdownTime
            });
        } catch (error) {
            throw new HttpException({
                message: error.message
            }, HttpStatus.BAD_REQUEST);
        }
    }
}