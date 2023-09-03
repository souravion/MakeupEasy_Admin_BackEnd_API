import { Module } from '@nestjs/common';
import { UserAuthService } from './auth.service';
import { UserAuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { UsersModule } from 'src/users/users/users.module';


@Module({
  imports: [JwtModule.register({}), UsersModule],
  controllers: [UserAuthController],
  providers: [UserAuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class UserAuthModule {}
