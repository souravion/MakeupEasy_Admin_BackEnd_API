import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type ArtistsDocument = Artists & Document;

@Schema()
export class Artists {

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    user_id:Types.ObjectId

    @Prop({type: Types.ObjectId})
    portfolio:Types.ObjectId

    @Prop({type: String })
    services: string

    @Prop({type: String})
    availability: string

    @Prop({ type: String})
    rating: string

    @Prop({type: String})
    total_reviews: string
}

export const ArtistsSchema = SchemaFactory.createForClass(Artists);