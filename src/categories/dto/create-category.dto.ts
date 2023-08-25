import { IsNotEmpty, IsString } from 'class-validator';
export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    name: string
    @IsNotEmpty()
    @IsString()
    description: string
    images: ImagesDto
    created_by: CreatedByUserInfo
    updated_by: CreatedByUserInfo
}


class ImagesDto {
    @IsNotEmpty()
    @IsString()
    icon: string
    @IsNotEmpty()
    @IsString()
    background: string
}

class CreatedByUserInfo {
    @IsNotEmpty()
    @IsString()
    user_id: string
    @IsNotEmpty()
    @IsString()
    name: string
}
