import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
// import * as admin from 'firebase-admin';
// import { initializeApp , cert , ServiceAccount } from 'firebase-admin/app';



async function bootstrap() {


  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  app.enableCors()


  // admin.initializeApp({
  //   credential: admin.credential.cert(fireBaseConfig as admin.ServiceAccount),
  //   storageBucket: "gs://makeupeasy-4a15d.appspot.com",
  // });

  await app.listen(port);
}
bootstrap();
