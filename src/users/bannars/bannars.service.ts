import { Injectable } from '@nestjs/common';
import { CreateBannarDto } from './dto/create-bannar.dto';
import { UpdateBannarDto } from './dto/update-bannar.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Banners, BannersDcouments } from 'src/admin/banners/shemas/banners.sheamas';
import { Model } from 'mongoose';

@Injectable()
export class BannarsService {
  find(arg0: {}, arg1: { __v: number; }) {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectModel(Banners.name) private bannerModel :Model<BannersDcouments>){}
  create(createBannarDto: CreateBannarDto) {
    return 'This action adds a new bannar';
  }

  async findAll(): Promise<BannersDcouments[]> {
    return this.bannerModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} bannar`;
  }

  update(id: number, updateBannarDto: UpdateBannarDto) {
    return `This action updates a #${id} bannar`;
  }

  remove(id: number) {
    return `This action removes a #${id} bannar`;
  }
}
