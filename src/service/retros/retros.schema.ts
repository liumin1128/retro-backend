import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as mongooseDelete from 'mongoose-delete';
// import * as mongooseAutopopulate from 'mongoose-autopopulate';
import { UserDocument } from '@/service/users/schemas/users.schema';

@Schema({ timestamps: true })
export class Retro {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: UserDocument;

  @Prop()
  content: string;

  @Prop()
  date: string;

  @Prop()
  title: string;

  @Prop()
  pictures: string[];
}

const RetroSchema = SchemaFactory.createForClass(Retro);

// https://stackoverflow.com/questions/49387454/mongoose-plugins-nestjs
RetroSchema.plugin(mongoosePaginate);
RetroSchema.plugin(mongooseDelete);
// RetroSchema.plugin(mongooseAutopopulate);

type RetroDocument = Retro & mongoose.Document;

export { RetroSchema, RetroDocument };
