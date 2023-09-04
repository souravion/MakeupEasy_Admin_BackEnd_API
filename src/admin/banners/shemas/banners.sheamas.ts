import { Prop,Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from "mongoose"
import { BannersType } from './banner-type.enum';

export type BannersDcouments = Banners & Document ;

// class Images {
//     @Prop({ required: true})
//     image_url: string
// }

@Schema({_id: false}) 
class User {
  @Prop({ type:Types.ObjectId, required: true})
  user_id: Types.ObjectId

  @Prop({ type: String, required: true})
  name: string;
}


@Schema({versionKey: false})
export class Banners {

    @Prop({type: String})
    title: string
    
    @Prop({})
    description: String

    @Prop({type:Boolean, default: true})
    active: Boolean

    @Prop({ type: String , required: true})
    image_url:string

    @Prop({type: Date, default: Date.now })
    created_at: Date
    
    @Prop({ type: Date , default: Date.now })
    updated_at: Date

    @Prop({ type:User})
    created_by: User

    @Prop({ type: User})
    updated_by: User


}


export const BannersSchema = SchemaFactory.createForClass(Banners);
