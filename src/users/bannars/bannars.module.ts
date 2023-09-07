import { Module } from '@nestjs/common';
import { BannarsService } from './bannars.service';
import { BannarsController } from './bannars.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Banners, BannersSchema } from 'src/admin/banners/shemas/banners.sheamas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Banners.name, schema: BannersSchema }]),
  ],
  controllers: [BannarsController],
  providers: [BannarsService],
})
export class BannarsModule {}
