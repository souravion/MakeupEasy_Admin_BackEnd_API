import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AdminAuthService } from './admin_auth.service';
import { CreateAdminAuthDto } from './dto/create-admin_auth.dto';
import { UpdateAdminAuthDto } from './dto/update-admin_auth.dto';
import { CreateUserDto } from 'src/users/users/dto/create-user.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { ExtendedRequest } from './admin_auth.interface';



@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: any) {
    return this.adminAuthService.signUp(createUserDto);
  }

  @Post('signin')
  signin(@Body() data: CreateAdminAuthDto) {
    return this.adminAuthService.signIn(data);
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
    return this.adminAuthService.refreshTokens(userId, refreshToken);
  }
}
