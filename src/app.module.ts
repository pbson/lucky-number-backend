import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { PotModule } from './modules/pot/pot.module';
import path = require('path');
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    SharedModule,
    DatabaseModule,
    PotModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
