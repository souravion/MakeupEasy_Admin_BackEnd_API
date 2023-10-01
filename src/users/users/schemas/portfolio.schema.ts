import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Artists } from './artists.schema';

export type PortfolioDocument = Portfolio & Document;

@Schema()
export class Portfolio {
    @Prop({ type: Types.ObjectId, ref: Artists.name, required: true })
    user_id: Types.ObjectId;
  
    @Prop([String])
    image_urls: string[];
  
    @Prop({ type: String, required: true })
    description: string;
  
    @Prop([String])
    tags: string[];
}


export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);