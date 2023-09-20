import { Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { JwtPayload } from 'src/common/interface/jwtPayload.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Banners, BannersDcouments } from './shemas/banners.sheamas';
import { Model } from 'mongoose';
import { HttpStatus , HttpException} from '@nestjs/common';
import { CrudResponse } from 'src/common/type/crudResponses';
import { FirebaseService } from 'src/common/firebase/firebase/firebase.service';
@Injectable()
export class BannersService {
  constructor(@InjectModel(Banners.name) private bannerModel :Model<BannersDcouments>, private firebaseService:FirebaseService){}
  async create(
    createBannerDto: CreateBannerDto , 
    request:JwtPayload,
    file:File
    ) {
    const existingBanner = await this.bannerModel.findOne({ title: createBannerDto.title }).exec();

    if (existingBanner) {
      throw new HttpException('Banner title already exists', HttpStatus.CONFLICT);
    }


    const uploadedFilename = await this.firebaseService.uploadImage(file);

    const imageUrl = await this.firebaseService.getImageUrl(uploadedFilename);

    const {userId , name } = request

    const modifiedDto = {
      ...createBannerDto,
      created_by : {...createBannerDto.created_by, user_id: userId, name: name},
      image_url:imageUrl.toString(),
      fileName:uploadedFilename

    }
    console.log(modifiedDto)
    await new this.bannerModel(modifiedDto).save();
    return  CrudResponse.createResponse
  }

  async findAll(): Promise<BannersDcouments[]> {
    return this.bannerModel.find().exec();
  }

  async findById(id: string): Promise<BannersDcouments> {
    return this.bannerModel.findById(id);
  }

  // async update(id: string,updateBannerDto: UpdateBannerDto, request:JwtPayload) {
    
  //   const {userId, name } = request
  //   const modofiedDto = {
  //     ...updateBannerDto,
  //     updated_by: {...updateBannerDto.updated_by, user_id: userId, name: name }

  //   }
  //   await this.bannerModel.findByIdAndUpdate(id, modofiedDto, { new: true }).exec();

  //   return  CrudResponse.updateResponse
  // }

  async update(id: string, updateBannerDto: UpdateBannerDto, request: JwtPayload, imageFile?: File) {
    try {
      const existingBanner = await this.findById(id);
      if (!existingBanner) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
  
      existingBanner.title = updateBannerDto.title;
      existingBanner.description = updateBannerDto.description;
      existingBanner.status = updateBannerDto.status;
  
      if (updateBannerDto.image_url) {
        existingBanner.image_url = updateBannerDto.image_url;
      } else if (imageFile) {
        const uploadedFilename = await this.firebaseService.uploadImage(imageFile);
        const imageUrl = await this.firebaseService.getImageUrl(uploadedFilename);
        existingBanner.image_url = imageUrl.toString();
        await this.firebaseService.deleteImageByFileName(existingBanner.fileName);
      }
  
      const { userId, name } = request;
      const modofiedDto = {
        ...existingBanner,
        updated_by: { ...updateBannerDto.updated_by, user_id: userId, name: name }
      };
  
      const updatedBanner = await this.bannerModel.findByIdAndUpdate(id, modofiedDto, { new: true }).exec();
  
      if (!updatedBanner) {
        throw new HttpException('Banner update failed', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  
      return CrudResponse.updateResponse;
    } catch (error) {
      // Handle the error, you can log it or throw a custom exception
      console.error(error);
      throw new HttpException('Banner update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async remove(id: string)  {
    const isExistingBanner = await this.bannerModel.findOne({ _id: id }).exec();
    if(!isExistingBanner){
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
    try{
      await this.bannerModel.findByIdAndDelete(id).exec();
      const fileNmae = isExistingBanner.fileName;
      await this.firebaseService.deleteImageByFileName(fileNmae)
      return CrudResponse.deleteResponse
    }catch(dbError){
      throw new HttpException('Invalid request', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
