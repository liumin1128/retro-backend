import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as mongooseDelete from 'mongoose-delete';
// import * as mongooseAutopopulate from 'mongoose-autopopulate';

@Schema({ timestamps: true })
export class Like {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Types.ObjectId;

  @Prop({
    required: true,
    enum: ['Game', 'News', 'Pet', 'Other'],
  })
  category: string;

  @Prop()
  cover: string;

  @Prop()
  icon: string;
}

const LikeSchema = SchemaFactory.createForClass(Like);

// https://stackoverflow.com/questions/49387454/mongoose-plugins-nestjs
LikeSchema.plugin(mongoosePaginate);
LikeSchema.plugin(mongooseDelete);
// LikeSchema.plugin(mongooseAutopopulate);

type LikeDocument = Like & mongoose.Document;

export { LikeSchema, LikeDocument };
