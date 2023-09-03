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

@Module({
  imports: [
    ConfigModule.forRoot(
      { 
        isGlobal: true, load: [config]
      }),
      
          //   MongooseModule.forRoot('mongodb+srv://souravion:cwygl8IIlItv6guV@cluster0.5f2lxhi.mongodb.net/makeup_backend_db', {
          //       connectionName: 'makeup_db', // Custom connection name
          //   }),

          //   MongooseModule.forRoot('mongodb+srv://souravion:cwygl8IIlItv6guV@cluster0.5f2lxhi.mongodb.net/makeup_db', {
          //      connectionName: 'makeup_db', // Custom connection name
          // }),


      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService) => {
          console.log('Admin', configService.internalConfig.mongodb.admindatabase.connectionString)
          return {
            uri: configService.internalConfig.mongodb.admindatabase.connectionString,
            connectionName: 'ADMIN', // Use the correct connection name
            poolSize: 10, // Set an appropriate pool size
          };
        },
      }),

      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService) => {
          console.log("User", configService.internalConfig.mongodb.userdatabase.connectionString)
          return {
            uri: configService.internalConfig.mongodb.userdatabase.connectionString,
            connectionName: 'APP', // Use the correct connection name
            poolSize: 10, // Set an appropriate pool size
          };
        },
      }),


    AdminUserModule, 
    AdminAuthModule, 
    CategoriesModule, 
    BannersModule, 
    FaqModule,
    UserAuthModule,
  ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
