
import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';

export class CreateFaqDto {
  @IsNotEmpty()
  @IsString()
  question: string;
  
  @IsString()
  @IsNotEmpty()
  answer: string;

  @IsBoolean()
  active: boolean;
}
