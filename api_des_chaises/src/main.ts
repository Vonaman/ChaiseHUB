import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    //origin: process.env.FRONTEND_URL || 'http://localhost:8080', // port de Next.js
    //origin: 'https://vonaman.fr',
    origin: '*', // Autoriser toutes les origines pour le développement
    // credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
