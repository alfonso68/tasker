import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import * as serviceAccount from './firebase-config.json';

async function bootstrap() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
  const app = await NestFactory.create(AppModule);
  app.enableCors({ 
    origin: process.env.CORS_ORIGINS.split('|'),
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
