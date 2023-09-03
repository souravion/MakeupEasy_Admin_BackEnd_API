import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Categories, CategoriesSchema } from './schemas/categories.schema';
import { FirebaseService } from 'src/common/firebase/firebase/firebase.service';
import { FirebaseModule } from 'src/common/firebase/firebase/firebase.module';

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([{ name: Categories.name, schema: CategoriesSchema }]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
