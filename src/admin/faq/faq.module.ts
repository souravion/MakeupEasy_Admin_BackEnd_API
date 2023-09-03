import { Module } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqController } from './faq.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FAQ, FAQSchema } from './schemas/faq.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: FAQ.name , schema: FAQSchema}])
  ],
  controllers: [FaqController],
  providers: [FaqService],
})
export class FaqModule {}
