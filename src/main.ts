import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //app.use('/', express.static('uploads'));
  //app.useStaticAssets(join(__dirname, '../../client/dist'))
  await app.listen(4000);
}
bootstrap();
