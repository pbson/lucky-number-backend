import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { UpdatePotDto } from './dto/update-pot.dto';
import { PotService } from './pot.service';
import { PotDto } from './dto/pot.dto';

import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
@Controller('pot')
export class PotController {
    constructor(private potService: PotService) {}

    @Post()
    @ApiOperation({ summary: 'Create new pot' })
    @ApiOkResponse({ type: PotDto })
    async createPot() {
        return await this.potService.createPot();
    }

    @Put()
    @ApiOperation({ summary: 'Update existing pot' })
    @ApiBody({ type: UpdatePotDto })
    @ApiOkResponse({ type: PotDto })
    async updatePot(@Body() updatedPot: UpdatePotDto) {
        console.log(updatedPot.id)
        return await this.potService.updatePot(updatedPot);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get pot by id' })
    async getPotById(@Param('id') id: string) {
        return await this.potService.getPotById(id);
    }
}