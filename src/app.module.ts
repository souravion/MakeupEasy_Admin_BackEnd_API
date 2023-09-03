import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './admin/users/users.module';
import { AuthModule } from './admin/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config/config';
import { CategoriesModule } from './admin/categories/categories.module';
import { BannersModule } from './admin/banners/banners.module';
import { FaqModule } from './admin/faq/faq.module';
import { FirebaseModule } from './common/firebase/firebase/firebase.module';
@Module({
  imports: [
    ConfigModule.forRoot(
      { 
        isGlobal: true, load: [config]
      }),
      
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(configService) => {
        return {
          uri:configService.internalConfig.mongodb.database.connectionString,
          // databaseName:configService.internalConfig.mongodb.database.databaseName
        }
      }
      
    }),
    UsersModule, AuthModule, CategoriesModule, BannersModule, FaqModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
