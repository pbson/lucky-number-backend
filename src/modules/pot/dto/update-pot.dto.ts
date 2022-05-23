import { ApiProperty } from '@nestjs/swagger';

export class UpdatePotDto {
    @ApiProperty()
    id: bigint;

    @ApiProperty()
    winnerAddress: string;

    @ApiProperty()
    isRewardClaimed: boolean;

    @ApiProperty()
    players: string[];

    @ApiProperty()
    startCountdownTime: Date;
}