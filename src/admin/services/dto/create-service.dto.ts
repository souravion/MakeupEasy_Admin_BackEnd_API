
import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';
export class CreateServiceDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsBoolean()
    status: boolean;
}
