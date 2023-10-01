import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BannarsService } from './bannars.service';
import { CreateBannarDto } from './dto/create-bannar.dto';
import { UpdateBannarDto } from './dto/update-bannar.dto';

@Controller('Api/bannars')
export class BannarsController {
  constructor(private readonly bannarsService: BannarsService) {}

  @Get()
  findAll() {
    return this.bannarsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannarsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBannarDto: UpdateBannarDto) {
    return this.bannarsService.update(+id, updateBannarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannarsService.remove(+id);
  }
}
