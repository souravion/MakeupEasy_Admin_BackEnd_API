import { IsNotEmpty, IsString } from 'class-validator';
export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    name: string
    @IsNotEmpty()
    @IsString()
    description: string
    image: string
    created_by: CreatedByUserInfo
    updated_by: CreatedByUserInfo
}

class CreatedByUserInfo {
    @IsNotEmpty()
    @IsString()
    user_id: string
    @IsNotEmpty()
    @IsString()
    name: string
}
