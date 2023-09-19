import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service, ServiceDocument } from './shemas/service.shemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrudResponse } from 'src/common/type/crudResponses';
import { JwtPayload } from 'src/common/interface/jwtPayload.interface';

@Injectable()
export class ServicesService {
  constructor(@InjectModel(Service.name) private serviceModel: Model<ServiceDocument>){}
 async create(createServiceDto: CreateServiceDto, request:JwtPayload) {
  
    const existingService = await this.serviceModel.findOne({ question: createServiceDto.name }).exec();

    if(existingService)
    throw new HttpException ('Question already exists', HttpStatus.CONFLICT)
    const {userId, name } = request

    const modifiedDto = {
      ...createServiceDto,
      created_by:{...createServiceDto, user_id: userId, name:name }
    }
    console.log(modifiedDto)
    await new this.serviceModel(modifiedDto).save();
    return CrudResponse.createResponse
  }

  async findAll(): Promise<ServiceDocument[]> {
    return this.serviceModel.find().exec();
  }
  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto, request:JwtPayload) {
    const {userId, name} = request;
    const modifiedDto = {
      ...updateServiceDto,
      updated_by:{...updateServiceDto, user_id: userId, name:name }
    }

    await this.serviceModel.findByIdAndUpdate(id, modifiedDto, {new: true}).exec()
    return CrudResponse.updateResponse;
  }

  async remove(id: string) {
    const isExistingService = await this.serviceModel.findOne({ _id: id }).exec();
    if(!isExistingService)
    throw new HttpException("Invalid request", HttpStatus.BAD_REQUEST)

    await this.serviceModel.findByIdAndDelete(id).exec();
    return CrudResponse.deleteResponse
  }
}
