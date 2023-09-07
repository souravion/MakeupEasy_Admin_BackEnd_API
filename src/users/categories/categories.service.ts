import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Categories, CategoriesDocument } from 'src/admin/categories/schemas/categories.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Categories.name)  private categoryModel: Model<CategoriesDocument>){}
  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  async findAll(): Promise<CategoriesDocument[]> {
    return this.categoryModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
