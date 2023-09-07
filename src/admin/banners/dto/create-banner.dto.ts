import { IsNotEmpty, IsString } from 'class-validator';

// class ImageDto {
//     @IsString()
//     image_url: string;
//     order: number;
//   }

class CreatedByUserInfo {
    @IsNotEmpty()
    @IsString()
    user_id: string
    @IsNotEmpty()
    @IsString()
    name: string
}  

export class CreateBannerDto {
    @IsNotEmpty()
    @IsString()
    type: string
    @IsNotEmpty()
    @IsString()
    title: string
    @IsString()
    description?: string
    @IsNotEmpty()
    image_url: string
    created_by: CreatedByUserInfo
    updated_by: CreatedByUserInfo
}
