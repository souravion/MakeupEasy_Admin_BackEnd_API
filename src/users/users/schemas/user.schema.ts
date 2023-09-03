import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  password: string;
  
	@Prop()
  refreshToken: string;

  @Prop()
  registration_date: Date;

  @Prop()
  last_login_date: Date;
  
}

export const UserSchema = SchemaFactory.createForClass(User);