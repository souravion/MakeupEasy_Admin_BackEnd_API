import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/common/schemas/user.schema';

export type FAQDocument = FAQ & Document;
@Schema()
export class FAQ {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  answer: string;

  @Prop({ default: 'Inactive', enum: ['Active', 'Inactive'] })
  status: string

  @Prop( { type: Date, default: Date.now })
  created_at:Date;

  @Prop({ type: Date, default:Date.now })
  updated_at:Date;

  @Prop({ type: User})
  created_by:User

  @Prop({ type: User})
  updated_by:User
}

export const FAQSchema = SchemaFactory.createForClass(FAQ);
