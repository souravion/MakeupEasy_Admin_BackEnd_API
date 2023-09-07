import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { LocationService } from './location.service';
import { Location, LocationSchema } from './schemas/location.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema}, 
      { name: Location.name, schema: LocationSchema }
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, LocationService],
  exports: [UsersService, LocationService],

})
export class UsersModule {}
