import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Categories, CategoriesDocument } from './schemas/categories.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoriesService {

  constructor(@InjectModel(Categories.name)  private categoryModel: Model<CategoriesDocument>){}
  async create(createCategoryDto: CreateCategoryDto, userInfo: any) {
    const { userId , name } = userInfo
    const modifiedDto = {
      ...createCategoryDto,
      created_by: {...createCategoryDto.created_by, user_id: userId, name: name },
    };
    const createdCategory = new this.categoryModel(modifiedDto);
    return createdCategory.save();
  
  }

  async findAll(): Promise<CategoriesDocument[]> {
    return this.categoryModel.find().exec();
  }

  async findById(id: string): Promise<CategoriesDocument> {
    return this.categoryModel.findById(id);
  }

  async update(id: string,updateCategoryDto: UpdateCategoryDto, userInfo:any): Promise<CategoriesDocument> {
    const {userId, name } = userInfo
    const modofiedDto = {
      ...updateCategoryDto,
      updated_by: {...updateCategoryDto.updated_by, user_id: userId, name: name }

    }
    return this.categoryModel.findByIdAndUpdate(id, modofiedDto, { new: true }).exec();
  }

  async remove(id: string): Promise<CategoriesDocument> {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }

}
