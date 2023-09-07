import { Controller, Get, Post, Body, Patch, Param, Delete, Req,UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
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
    private readonly bannersService: BannersService,
    private readonly firebaseService:FirebaseService
    ) {}

  @Post()
  @UseInterceptors(FileInterceptor('images'))
  async create(@UploadedFile() file, @Body() createBannerDto: CreateBannerDto, @Req() request: ExtendedRequest ) {
    // console.log(createBannerDto)
    const uploadedFilename = await this.firebaseService.uploadImage(file);

    const imageUrl = await this.firebaseService.getImageUrl(uploadedFilename);
    const modifiedData = {
      ...createBannerDto, // Copy existing properties
      image_url: imageUrl.toString(), // Add the image property using tooStriong becuse imageurl return array
    };
    
    return this.bannersService.create(modifiedData, request.user);
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
