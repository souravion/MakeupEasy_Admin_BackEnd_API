import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Categories, CategoriesDocument } from './schemas/categories.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtPayload } from 'src/common/interface/jwtPayload.interface';
import { CrudResponse } from 'src/common/type/crudResponses';
import { FirebaseService } from 'src/common/firebase/firebase/firebase.service';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectModel(Categories.name)  
    private categoryModel: Model<CategoriesDocument>,
    private firebaseService:FirebaseService
    
    ){}
  async create(createCategoryDto: CreateCategoryDto, request: JwtPayload) {
    const existingCategory = await this.categoryModel.findOne({ name: createCategoryDto.name }).exec();
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

  async update(id: string, updateCategoryDto: UpdateCategoryDto, request: JwtPayload, imageFile?: File) {
    try {
      const existingCategory = await this.findById(id);
      if (!existingCategory) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
  
      existingCategory.name = updateCategoryDto.name;
      existingCategory.description = updateCategoryDto.description;
      existingCategory.status = updateCategoryDto.status;
  
      if (updateCategoryDto.image) {
        existingCategory.image = updateCategoryDto.image;
      } else if (imageFile) {
        const uploadedFilename = await this.firebaseService.uploadImage(imageFile);
        const imageUrl = await this.firebaseService.getImageUrl(uploadedFilename);
        existingCategory.image = imageUrl.toString();
        await this.firebaseService.deleteImageByFileName(existingCategory.fileName);
      }
  
      const { userId, name } = request;
      const modofiedDto = {
        ...existingCategory,
        updated_by: { ...updateCategoryDto.updated_by, user_id: userId, name: name }
      };
  
      const updatedCategory = await this.categoryModel.findByIdAndUpdate(id, modofiedDto, { new: true }).exec();
  
      if (!updatedCategory) {
        throw new HttpException('Category update failed', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  
      return CrudResponse.updateResponse;
    } catch (error) {
      // Handle the error, you can log it or throw a custom exception
      console.error(error);
      throw new HttpException('Category update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  async remove(id: string)  {
    const isExistingCategory = await this.categoryModel.findOne({ _id: id }).exec();
    if(!isExistingCategory){
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
    try{
      await this.categoryModel.findByIdAndDelete(id).exec();
      const fileNmae = isExistingCategory.fileName;
      await this.firebaseService.deleteImageByFileName(fileNmae)
      return CrudResponse.deleteResponse
    }catch(dbError){
      throw new HttpException('Invalid request', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
