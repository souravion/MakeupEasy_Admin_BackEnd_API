import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type ServiceDocument = Service & Document;
@Schema()
export class Service {

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    user_id:Types.ObjectId

    @Prop({ type: Types.ObjectId, required: true })
    studio_id:Types.ObjectId

    @Prop({ type: String})
    rating: string

    @Prop({type: String})
    total_reviews: string

    @Prop({ default: 'Active', enum: ['Active', 'Inactive'] })
    status:string

    @Prop({ type: Date})
    added_date: Date

}

export const ServicesSchema = SchemaFactory.createForClass(Service);