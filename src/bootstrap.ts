import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as requestIp from 'request-ip';

import { AppModule } from './app.module';
import { SharedModule } from './shared/shared.module';
import { ConfigService } from './shared/services/config.service';
import { setupSwagger } from './swagger';

const bootstrap = async (): Promise<INestApplication> => {
  const app = await NestFactory.create(AppModule);
  const configService = app.select(SharedModule).get(ConfigService);

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validationError: {
        target: false,
      },
    }),
  );

  const corsOptions: CorsOptions = {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'Language', 'Content-Disposition', 'Timezone'],
    optionsSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    exposedHeaders: ['Content-Disposition'],
  };
  app.enableCors(corsOptions);

  app.use(requestIp.mw());

  app.setGlobalPrefix('api');

  setupSwagger(app, configService.basePath);
  await app.listen(configService.port);

  return app;
};

export default bootstrap;
