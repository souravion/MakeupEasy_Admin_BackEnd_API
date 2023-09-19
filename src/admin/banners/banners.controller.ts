import { Controller, Get, Post, Body, Patch, Param, Delete, Req,UseGuards, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ExtendedRequest } from '../admin_auth/admin_auth.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { FirebaseService } from 'src/common/firebase/firebase/firebase.service';

@UseGuards(AccessTokenGuard)
@Controller('admin/banners')
export class BannersController {
  constructor(
    private readonly bannersService: BannersService
    ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() file,  @Body() createBannerDto: CreateBannerDto, @Req() request: ExtendedRequest) {
    return this.bannersService.create(createBannerDto, request.user , file);
  }

  @Get()
  findAll() {
    return this.bannersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannersService.findById(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto, @Req() request:ExtendedRequest) {
  //   return this.bannersService.update(id, updateBannerDto, request.user);
  // }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image_url'))
  update(
    @Param('id') id: string, 
    @Body() formData: UpdateBannerDto, 
    @Req() request:ExtendedRequest,
    @UploadedFile() image?: any
    ) {
    return this.bannersService.update(id, formData, request.user , image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannersService.remove(id);
  }
}
