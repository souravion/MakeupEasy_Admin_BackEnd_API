import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config/config';
import { CategoriesModule } from './admin/categories/categories.module';
import { BannersModule } from './admin/banners/banners.module';

import { FaqModule } from './admin/faq/faq.module';
import { UserAuthModule } from './users/auth/auth.module';
import { AdminAuthModule } from './admin/admin_auth/admin_auth.module';
import { AdminUserModule } from './admin/admin_user/admin_user.module';
import { CategoriesModule as AppCategoriesModule } from './users/categories/categories.module';
import { BannarsModule as AppBannarsModule} from './users/bannars/bannars.module';

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
    AdminUserModule, 
    AdminAuthModule, 
    CategoriesModule, 
    BannersModule, 
    FaqModule,
    UserAuthModule,
    AppCategoriesModule,
    AppBannarsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
