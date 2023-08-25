import { Injectable ,HttpStatus , HttpException } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { JwtPayload } from 'src/common/interface/jwtPayload.interface';
import { InjectModel } from '@nestjs/mongoose';
import { FAQ, FAQDocument } from './schemas/faq.schema';
import { Model } from 'mongoose';
import { CrudResponse } from 'src/common/type/crudResponses';

@Injectable()
export class FaqService {
  constructor(@InjectModel(FAQ.name) private faqModel: Model<FAQDocument>){}
  async create(createFaqDto: CreateFaqDto, request:JwtPayload) {
    const existingBanner = await this.faqModel.findOne({ question: createFaqDto.question }).exec();

    if(existingBanner)
    throw new HttpException ('Question already exists', HttpStatus.CONFLICT)

    const {userId, name } = request

    const modifiedDto = {
      ...createFaqDto,
      created_by:{...createFaqDto, user_id: userId, name:name }
    }
    await new this.faqModel(modifiedDto).save();
    return CrudResponse.createResponse
  }
  async findAll(): Promise<FAQDocument[]> {
    return this.faqModel.find().exec();
  }

  async findById(id: string): Promise<FAQDocument> {
    return this.faqModel.findById(id);
  }

  async update(id: string, updateFaqDto: UpdateFaqDto, request:JwtPayload) {

    const {userId, name} = request;
    const modifiedDto = {
      ...updateFaqDto,
      updated_by:{...updateFaqDto, user_id: userId, name:name }
    }

    await this.faqModel.findByIdAndUpdate(id, modifiedDto, {new: true}).exec()
    return CrudResponse.updateResponse;
  }
  async remove(id: string) {
    const isExistingFaq = await this.faqModel.findOne({ _id: id }).exec();
    if(!isExistingFaq)
    throw new HttpException("Invalid request", HttpStatus.BAD_REQUEST)

    await this.faqModel.findByIdAndDelete(id).exec();
    return CrudResponse.deleteResponse
  }

}
