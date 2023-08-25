import { Controller, Get, Post, Body, Patch, Param, Delete, Req,UseGuards } from '@nestjs/common';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { ExtendedRequest } from 'src/auth/auth.interface';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@UseGuards(AccessTokenGuard)
@Controller('admin/banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Post()
  create(@Body() createBannerDto: CreateBannerDto, @Req() request: ExtendedRequest ) {
    return this.bannersService.create(createBannerDto, request.user);
  }

  @Get()
  findAll() {
    return this.bannersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannersService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto, @Req() request:ExtendedRequest) {
    return this.bannersService.update(id, updateBannerDto, request.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannersService.remove(id);
  }
}
