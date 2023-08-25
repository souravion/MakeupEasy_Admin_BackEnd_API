import { Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { JwtPayload } from 'src/common/interface/jwtPayload.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Banners, BannersDcouments } from './shemas/banners.sheamas';
import { Model } from 'mongoose';
import { HttpStatus , HttpException} from '@nestjs/common';
import { CrudResponse } from 'src/common/type/crudResponses';
@Injectable()
export class BannersService {
  constructor(@InjectModel(Banners.name) private bannerModel :Model<BannersDcouments>){}
  async create(createBannerDto: CreateBannerDto , request:JwtPayload) {
    const existingBanner = await this.bannerModel.findOne({ title: createBannerDto.title }).exec();

    if (existingBanner) {
      throw new HttpException('Banner title already exists', HttpStatus.CONFLICT);
    }

    const {userId , name } = request

    const modifiedDto = {
      ...createBannerDto,
      created_by : {...createBannerDto.created_by, user_id: userId, name: name}

    }
    await new this.bannerModel(modifiedDto).save();
    return  CrudResponse.createResponse
  }

  async findAll(): Promise<BannersDcouments[]> {
    return this.bannerModel.find().exec();
  }

  async findById(id: string): Promise<BannersDcouments> {
    return this.bannerModel.findById(id);
  }

  async update(id: string,updateBannerDto: UpdateBannerDto, request:JwtPayload) {
    
    const {userId, name } = request
    const modofiedDto = {
      ...updateBannerDto,
      updated_by: {...updateBannerDto.updated_by, user_id: userId, name: name }

    }
    await this.bannerModel.findByIdAndUpdate(id, modofiedDto, { new: true }).exec();

    return  CrudResponse.updateResponse
  }
  async remove(id: string){
    const isExistingBanner = await this.bannerModel.findOne({ _id: id }).exec();
    if(!isExistingBanner)
    throw new HttpException("Invalid request", HttpStatus.BAD_REQUEST)
    await this.bannerModel.findByIdAndDelete(id).exec();
    return CrudResponse.deleteResponse
  }
}
