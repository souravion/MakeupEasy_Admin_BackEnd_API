import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminUserDocument = AdminUser & Document;

@Schema()
export class AdminUser {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

	@Prop()
  refreshToken: string;
}

export const AdminUserSchema = SchemaFactory.createForClass(AdminUser);