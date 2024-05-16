import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import AppModule from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') || 3000;
  const corsOrigin =
    configService.get<string>('CORS_ORIGIN') || 'http://localhost:5173';

  const corsOptions = {
    origin: corsOrigin,
    credentials: true,
  };

  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(cookieParser());
  await app.listen(port);
}
bootstrap();
