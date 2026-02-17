// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);

  // Validation globale avec transformation automatique
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Supprime les champs non définis dans le DTO
      forbidNonWhitelisted: true, // Rejette les requêtes avec champs inconnus
      transform: true, // Transforme automatiquement les types
    }),
  );

  // CORS configuré
  const corsOrigin = process.env.FRONTEND_URL || 'http://localhost:3000';
  app.enableCors({
    origin: corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Permet les cookies (pour JWT dans cookies)
  });

  // Préfixe global pour toutes les routes (optionnel)
  app.setGlobalPrefix('api'); // Toutes les routes commencent par /api

  const port = process.env.PORT || 3001;
  await app.listen(port);

  logger.log(`🚀 Application is running on: http://localhost:${port}`);
  logger.log(`🌍 CORS enabled for: ${corsOrigin}`);
  logger.log(`📝 API Documentation: http://localhost:${port}/api`);
}

bootstrap().catch((error) => {
  console.error('❌ Error starting application:', error);
  process.exit(1);
});
