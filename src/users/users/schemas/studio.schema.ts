import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Artists } from './artists.schema';

export type StudioDocument = Artists & Document;

@Schema()
export class Studio {
  @Prop({ type: Types.ObjectId, ref: Artists.name, required: true })
  user_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  location_id: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: number;

  @Prop({ type: Array })
  image_urls: [];

  @Prop({ type: Boolean, default:false})
  admin_varified: boolean

  @Prop({ type: Date})
  open:string

  @Prop({ type: Date})
  close:string

  @Prop({ type: Number, default:0})
  total_enquiry: number

  @Prop({ type: Number, default:0})
  pending_enquiry:Number

  @Prop({ type: Date})
  created_date:Date

  




  
}

export const StudioSchema = SchemaFactory.createForClass(Studio);
