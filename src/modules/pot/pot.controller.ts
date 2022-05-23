import { Controller, Get } from '@nestjs/common';

@Controller('pot')
export class PotController {
    @Get()
    findAll(): string {
        return 'This action returns all cats';
    }
}