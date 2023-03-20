import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as mongooseDelete from 'mongoose-delete';
import { UserDocument } from '@/service/users/schemas/users.schema';

@Schema({ timestamps: true })
export class Seat {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: UserDocument;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  logo: string;
}

const SeatSchema = SchemaFactory.createForClass(Seat);

// https://stackoverflow.com/questions/49387454/mongoose-plugins-nestjs
SeatSchema.plugin(mongoosePaginate);
SeatSchema.plugin(mongooseDelete);
// SeatSchema.plugin(mongooseAutopopulate);

type SeatDocument = Seat & mongoose.Document;

export { SeatSchema, SeatDocument };
