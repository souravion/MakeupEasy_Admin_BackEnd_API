import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Categories, CategoriesDocument } from './schemas/categories.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtPayload } from 'src/common/interface/jwtPayload.interface';
import { CrudResponse } from 'src/common/type/crudResponses';

@Injectable()
export class CategoriesService {

  constructor(@InjectModel(Categories.name)  private categoryModel: Model<CategoriesDocument>){}
  async create(createCategoryDto: CreateCategoryDto, request: JwtPayload) {
    const existingCategory = await this.categoryModel.findOne({ name: createCategoryDto.name }).exec();
    console.log(createCategoryDto)
    if(existingCategory)
    throw new HttpException('Category already exists', HttpStatus.CONFLICT);

    const { userId , name } = request
    const modifiedDto = {
      ...createCategoryDto,
      created_by: {...createCategoryDto.created_by, user_id: userId, name: name },
    };

    await new this.categoryModel(modifiedDto).save();
    return  CrudResponse.createResponse
  
  }

  async findAll(): Promise<CategoriesDocument[]> {
    return this.categoryModel.find().exec();
  }

  async findById(id: string): Promise<CategoriesDocument> {
    return this.categoryModel.findById(id);
  }

  async update(id: string,updateCategoryDto: UpdateCategoryDto, request:JwtPayload) {
    const {userId, name } = request
    const modofiedDto = {
      ...updateCategoryDto,
      updated_by: {...updateCategoryDto.updated_by, user_id: userId, name: name }

    }
    await this.categoryModel.findByIdAndUpdate(id, modofiedDto, { new: true }).exec();

    return CrudResponse.updateResponse
    
  }

  async remove(id: string)  {
    const isExistingCategory = await this.categoryModel.findOne({ _id: id }).exec();
    if(!isExistingCategory)
    throw new HttpException("Invalid request", HttpStatus.BAD_REQUEST)
    await this.categoryModel.findByIdAndDelete(id).exec();
    return CrudResponse.deleteResponse
  }

}
