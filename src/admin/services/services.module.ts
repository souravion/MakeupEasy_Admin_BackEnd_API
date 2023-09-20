import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServiceSchema } from './shemas/service.shemas';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Service.name , schema: ServiceSchema}])
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
