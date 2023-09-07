import { IsString, IsEmail, IsNotEmpty, IsArray, IsNumber, IsPositive, IsDate, Min, Max } from 'class-validator';

export class CreateUserDto {
  userInfo:UserDto;
  locationInfo:LocationDto;
}


export class UserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  name: string;

  
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password

  @IsString()
  address?: string;

  registration_date?: Date;
  last_login_date?: Date;
  refreshToken?: string;
}


export class ArtistDto {
  @IsNotEmpty()
  user_id: string; 

  @IsNotEmpty()
  portfolio_id: string; 

  @IsArray()
  @IsString({ each: true })
  services: string[];

  // @IsString()
  // pricing: string; 
  @IsNumber()
  @IsPositive()
  rating: number;
  
  @IsString()
  @IsNotEmpty()
  availability: string;

  @IsNumber()
  @IsPositive()
  total_reviews: number;
}

export class PortfolioDto {
  @IsNotEmpty()
  artist_id: string; 

  @IsArray()
  @IsString({ each: true })
  image_urls: string[];

  @IsString()
  @IsNotEmpty()
  description: string;
  
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}


export class AppointmentDto {
  @IsNotEmpty()
  client_id: string; 

  @IsNotEmpty()
  artist_id: string;
  
  @IsDate()
  date: Date;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsString()
  @IsNotEmpty()
  service_details: string;
}

export class ReviewDto {
  @IsNotEmpty()
  artist_id: string; 

  @IsNotEmpty()
  client_id: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  comments: string;
}

export class LocationDto {
  @IsNotEmpty()
  user_id: string; 

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;
}