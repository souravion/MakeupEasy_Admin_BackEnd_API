import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/common/schemas/user.schema';

export type ServiceDocument = Service & Document;
@Schema()
export class Service {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 'Inactive', enum: ['Active', 'Inactive'] })
  status: string;

  @Prop( { type: Date, default: Date.now })
  created_at:Date;

  @Prop({ type: Date, default:Date.now })
  updated_at:Date;

  @Prop({ type: User})
  created_by:User

  @Prop({ type: User})
  updated_by:User
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
