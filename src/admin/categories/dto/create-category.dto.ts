import { IsNotEmpty, IsString } from 'class-validator';
export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    name: string
    
    @IsNotEmpty()
    @IsString()
    description: string

    @IsString()
    status:string

    @IsString()
    image: string

    @IsNotEmpty()
    @IsString()
    fileName:string;
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
