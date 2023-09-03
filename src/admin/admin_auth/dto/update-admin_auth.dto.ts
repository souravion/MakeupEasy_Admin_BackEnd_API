import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminAuthDto } from './create-admin_auth.dto';

export class UpdateAdminAuthDto extends PartialType(CreateAdminAuthDto) {}
