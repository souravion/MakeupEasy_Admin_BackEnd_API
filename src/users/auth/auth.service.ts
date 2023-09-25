import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/users/dto/create-user.dto';

import { AuthDto } from './dto/auth.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocationService } from 'src/users/users/location.service';
import { UsersService } from 'src/users/users/users.service';

@Injectable()
export class UserAuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private locationService:LocationService
      ) {}
      async signUp(createUserDto: CreateUserDto): Promise<any> {
        // Check if user exists
        const userExists = await this.usersService.findByUsername(
          createUserDto.phone,
        );
        if (userExists) {
          throw new BadRequestException('User already exists');
        }
    
        const userInfo = {
          name:createUserDto.name,
          phone:createUserDto.phone,
          account_type:createUserDto.account_type,
          gender:"male"
        }
        ///Hash password
        const hash = await this.hashData(createUserDto.password);
        const newUser = await this.usersService.create({
          ...userInfo,
          password: hash,
        });

        const address = createUserDto.address
        const location = {
          latitude:address.latitude,
          longitude:address.longitude,
          sub_region:address.details.subLocality,
          city:address.details.locality,
          state:address.details.administrativeArea,
          country:address.details.country.name,
          country_code:address.details.country.code,
          postal_code:address.details.postalCode
        }

        console.log(location)
        await this.locationService.createLocation({
          ...location,
          user_id:newUser._id
        })


        const tokens = await this.getTokens(newUser._id, newUser.phone,newUser.name);
        await this.updateRefreshToken(newUser._id, tokens.refreshToken);
        return tokens;
      }
    
        async signIn(data: AuthDto) {
        // Check if user exists
        const user = await this.usersService.findByUsername(data.phone);
        if (!user) throw new BadRequestException('User does not exist');
        const passwordMatches = await argon2.verify(user.password, data.password);
        if (!passwordMatches)
          throw new BadRequestException('Password is incorrect');
        const tokens = await this.getTokens(user._id, user.phone, user.name);
        await this.updateRefreshToken(user._id, tokens.refreshToken);
        return tokens;
      }
    
        async logout(userId: string) {
        return this.usersService.update(userId, { refreshToken: null });
      }
    
      hashData(data: string) {
        return argon2.hash(data);
      }
    
      async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.usersService.update(userId, {
          refreshToken: hashedRefreshToken,
        });
      }
    
      async getTokens(userId: string, username: string, name:string) {
        const [accessToken, refreshToken] = await Promise.all([
          this.jwtService.signAsync(
            {
              userId: userId,
              username,
              name
            },
            {
              secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
              expiresIn: '7d',
            },
          ),
          this.jwtService.signAsync(
            {
              userId: userId,
              username,
              name
            },
            {
              secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
              expiresIn: '7d',
            },
          ),
        ]);
    
        return {
          accessToken,
          refreshToken,
        };
      }


      async refreshTokens(userId: string, refreshToken: string) {
        const user = await this.usersService.findById(userId);
        if (!user || !user.refreshToken)
          throw new ForbiddenException('Access Denied');
        const refreshTokenMatches = await argon2.verify(
          user.refreshToken,
          refreshToken,
        );
        if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
        const tokens = await this.getTokens(user.id, user.phone, user.name);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
      }


}
