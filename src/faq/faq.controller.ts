import { Controller, Get, Post, Req, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ExtendedRequest } from 'src/auth/auth.interface';

@UseGuards(AccessTokenGuard)
@Controller('admin/faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post()
  create(@Body() createFaqDto: CreateFaqDto, @Req() request:ExtendedRequest) {
    return this.faqService.create(createFaqDto, request.user);
  }

  @Get()
  findAll() {
    return this.faqService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faqService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto, @Req() request:ExtendedRequest) {
    return this.faqService.update(id, updateFaqDto, request.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.faqService.remove(id);
  }
}
