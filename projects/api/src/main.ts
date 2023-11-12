import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const main = await NestFactory.create(AppModule);

  const config = main.get(ConfigService);
  const api_port = config.get('port');

  main.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await main.listen(api_port);
}
bootstrap();
