import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

import { AdminAuthController } from './admin_auth.controller';
import { AdminUserModule } from '../admin_user/admin_user.module';
import { AdminAuthService } from './admin_auth.service';

@Module({
  imports: [JwtModule.register({}), AdminUserModule],
  controllers: [AdminAuthController],
  providers: [AdminAuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AdminAuthModule {}
