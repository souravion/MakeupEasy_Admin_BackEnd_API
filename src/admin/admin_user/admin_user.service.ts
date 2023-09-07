import { Injectable } from '@nestjs/common';
import { CreateAdminUserDto } from './dto/create-admin_user.dto';
import { UpdateAdminUserDto } from './dto/update-admin_user.dto';
import { AdminUser, AdminUserDocument } from './schemas/admin_user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AdminUserService {

  constructor(@InjectModel(AdminUser.name) private userModel: Model<AdminUserDocument>){}

  async create(createUserDto: CreateAdminUserDto): Promise<AdminUserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<AdminUserDocument[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<AdminUserDocument> {
    return this.userModel.findById(id);
  }

  async findByUsername(username: string): Promise<AdminUserDocument> {
    return this.userModel.findOne({ username }).exec();
  }

  async update(
    id: string,
    updateUserDto: UpdateAdminUserDto,
  ): Promise<AdminUserDocument> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<AdminUserDocument> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

}
