import {UploadedFile, UseInterceptors, Controller, Get, Post, Req, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FirebaseService } from 'src/common/firebase/firebase/firebase.service';
import { ExtendedRequest } from '../admin_auth/admin_auth.interface';

@UseGuards(AccessTokenGuard)
@Controller('admin/categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly firebaseService:FirebaseService
    ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() file, @Body() formData:CreateCategoryDto, @Req() request: ExtendedRequest) {

    const uploadedFilename = await this.firebaseService.uploadImage(file);
    const imageUrl = await this.firebaseService.getImageUrl(uploadedFilename);


    const modifiedData = {
      ...formData, // Copy existing properties
      image: imageUrl.toString(),
      fileName:uploadedFilename

    };


    return this.categoriesService.create(modifiedData,request.user)
  }


  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findById(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string, 
    @Body() formData: UpdateCategoryDto, 
    @Req() request:ExtendedRequest,
    @UploadedFile() image?: any
    ) {
    return this.categoriesService.update(id, formData, request.user , image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }


}
