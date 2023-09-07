import { PartialType } from '@nestjs/mapped-types';
import { CreateBannarDto } from './create-bannar.dto';

export class UpdateBannarDto extends PartialType(CreateBannarDto) {}
