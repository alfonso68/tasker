import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import * as serviceAccount from './firebase-config.json';

async function bootstrap() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: "https://radar-nest-default-rtdb.firebaseio.com/",
  });
  const app = await NestFactory.create(AppModule);
  app.enableCors({ 
    origin: [
      'http://localhost:3000',
      'http://localhost:3001'
    ],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
