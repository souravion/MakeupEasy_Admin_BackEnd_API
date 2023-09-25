import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema'; // Assuming you have a User schema


export type LocationDocument = Location & Document;

@Schema()
export class Location {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user_id: Types.ObjectId;

  @Prop({ type: Number, required: true })
  latitude: number;

  @Prop({ type: Number, required: true })
  longitude: number;

  @Prop({ type: String})
  sub_region: string

  @Prop({ type: String, required: false })
  city: string;

  @Prop({ type: String , required: false})
  state: string;

  @Prop({ type: String, required: true })
  country: string;

  
  @Prop({ type: String, required: true })
  country_code: string;

  @Prop({ type: Number , required: true })
  postal_code: number;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
