/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const globalPrefix = 'v0';

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,PUT,POST,DELETE', // ignoring PATCH and HEAD
    credentials: true,
  });
  app.setGlobalPrefix(globalPrefix);

  // wtf is a validation pipe???
  // Enable global validation pipes for DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove properties not defined in DTOs
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
      transform: true, // Automatically transform payloads to DTO instances
    })
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: ${await app.getUrl()}`);
}

bootstrap();
