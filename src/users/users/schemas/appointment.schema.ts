import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema'; 
import { Artists } from './artists.schema';

export type ArtistsDocument = Appointment & Document;


@Schema()
export class Appointment extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  client_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Artists.name, required: true })
  artist: Types.ObjectId;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: String, required: true })
  time: string;

  @Prop({ type: String, required: true })
  service_details: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
