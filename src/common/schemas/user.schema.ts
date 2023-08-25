import { Prop,  Schema} from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({_id: false}) 
export class User {
  @Prop({ type:Types.ObjectId, required: true})
  user_id: Types.ObjectId

  @Prop({ type: String, required: true})
  name: string;
}