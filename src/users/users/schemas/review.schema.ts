import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Artists } from './artists.schema';

export type ReviewDocument = Artists & Document;

@Schema()
export class Review {
  @Prop({ type: Types.ObjectId, ref: Artists.name, required: true })
  artist_id: Types.ObjectId;

  @Prop({ type: Number, required: true })
  rating: number;

  @Prop({ type: String })
  comments: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
