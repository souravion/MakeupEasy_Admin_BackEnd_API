import { Module } from '@nestjs/common';
import { AdminUserService } from './admin_user.service';
import { AdminUserController } from './admin_user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminUser, AdminUserSchema } from './schemas/admin_user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AdminUser.name, schema: AdminUserSchema }]),
  ],
  controllers: [AdminUserController],
  providers: [AdminUserService],
  exports:[AdminUserService]
})
export class AdminUserModule {}
