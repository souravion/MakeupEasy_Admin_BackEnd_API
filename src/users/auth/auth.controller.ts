import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserAuthService } from './auth.service';
import { CreateUserDto } from 'src/users/users/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { ExtendedRequest } from './auth.interface';

@Controller('user/auth')
export class UserAuthController {
  constructor(private readonly authService: UserAuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    // this.authService.logout(req.user['sub']);
  }

  
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: ExtendedRequest) {
    console.log(req)
    const userId = req.user['userId'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
