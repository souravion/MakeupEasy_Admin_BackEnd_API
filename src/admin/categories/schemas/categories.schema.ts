import { Prop,  Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategoriesDocument = Categories & Document;
/**
 * -------------------------------------------------------
 * @description This below scheam we use for create_by type this type of object 
 * property will hold the property type
 */
@Schema({_id: false}) 
class User {
  @Prop({ type:Types.ObjectId, required: true})
  user_id: Types.ObjectId

  @Prop({ type: String, required: true})
  name: string;
}

// /**
//  * ---------------------------------------------------------
//  * @description This below scheam we use for images type this type of object 
//  * property will hold the property type
//  */

// @Schema({_id: false})
// class Images {
//     @Prop({type: String})
//     icon:string

//     @Prop({ type: String})
//     background:string
// }


@Schema()
export class Categories {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true})
  description:string

  @Prop({ type: String, required: true})
  image: string
  
  @Prop( { type: Date, default: Date.now })
  created_at:Date;

  @Prop({ type: Date, default:Date.now })
  updated_at:Date;

  @Prop({ type: User})
  created_by:User

  @Prop({ type: User})
  updated_by:User

}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);