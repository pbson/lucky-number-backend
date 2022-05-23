import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication, basePath: string): void {
  const options = new DocumentBuilder()
    .setTitle('Lucky number API Document')
    .setVersion('1.0')
    .addServer(basePath)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
