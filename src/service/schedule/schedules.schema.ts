import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as mongooseDelete from 'mongoose-delete';
// import * as mongooseAutopopulate from 'mongoose-autopopulate';

@Schema({ timestamps: true })
export class Schedule {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Types.ObjectId;

  @Prop()
  date: Date;

  @Prop()
  status: string;

  @Prop()
  comment: string;
}

const ScheduleSchema = SchemaFactory.createForClass(Schedule);

// https://stackoverflow.com/questions/49387454/mongoose-plugins-nestjs
ScheduleSchema.plugin(mongoosePaginate);
ScheduleSchema.plugin(mongooseDelete);
// ScheduleSchema.plugin(mongooseAutopopulate);

type ScheduleDocument = Schedule & mongoose.Document;

export { ScheduleSchema, ScheduleDocument };
