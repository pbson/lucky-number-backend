import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../shared/services/config.service';
import { SharedModule } from '../shared/shared.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as any,
        host: configService.db.host,
        port: configService.db.port,
        username: configService.db.username,
        password: configService.db.password,
        database: configService.db.database,
        entities: [],
        synchronize: false,
        migrations: [],
      }),
    }),
  ],
})
export class DatabaseModule {}
