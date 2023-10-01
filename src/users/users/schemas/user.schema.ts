import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  // @Prop({ required: true, unique: true, lowercase: true })
  // username: string;

  // @Prop({ required: true, unique: true })
  // email: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  gender: string;
  
  @Prop({ required: false })
  avatar: string;

	@Prop()
  refreshToken: string;

  @Prop()
  registration_date: Date;

  @Prop()
  last_login_date: Date;

  @Prop()
  last_update_date: Date;

  @Prop({ default: 'Active', enum: ['Active', 'Inactive'] }) 
  account_status: string;

  @Prop({required : true})
  account_type:string

  @Prop({required : true, default: 5}) 
  //5 means user can list only 5 store then it can be chargeable(we will lan it for furture) 
  max_listing_studio_limit: number
  
}

export const UserSchema = SchemaFactory.createForClass(User);