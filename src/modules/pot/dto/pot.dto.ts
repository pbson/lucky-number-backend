import { User } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PotDto {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    winnerAddress: string;

    @ApiProperty()
    isRewardClaimed: boolean;

    @ApiProperty()
    startCountdownTime: Date;

    @ApiProperty()
    players: User[];
}