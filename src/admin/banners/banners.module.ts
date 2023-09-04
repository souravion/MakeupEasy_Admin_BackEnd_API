import { Module } from '@nestjs/common';
import { BannersService } from './banners.service';
import { BannersController } from './banners.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Banners, BannersSchema } from './shemas/banners.sheamas';
import { FirebaseModule } from 'src/common/firebase/firebase/firebase.module';

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([{ name: Banners.name, schema: BannersSchema }]),
  ],
  controllers: [BannersController],
  providers: [BannersService],
})
export class BannersModule {}
