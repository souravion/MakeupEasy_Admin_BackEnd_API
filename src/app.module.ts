import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config/config';
import { CategoriesModule } from './categories/categories.module';
import { BannersModule } from './banners/banners.module';
import { FaqModule } from './faq/faq.module';

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
          dbName: configService.internalConfig.mongodb.database.databaseName
        }
      }
      
    }),
    UsersModule, AuthModule, CategoriesModule, BannersModule, FaqModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
