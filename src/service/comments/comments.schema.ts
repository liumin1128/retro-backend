import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as mongooseDelete from 'mongoose-delete';
import * as mongooseAutopopulate from 'mongoose-autopopulate';

@Schema({ timestamps: true })
export class Comment {
  @Prop()
  content: string;
}

const CommentSchema = SchemaFactory.createForClass(Comment);

// https://stackoverflow.com/questions/49387454/mongoose-plugins-nestjs
CommentSchema.plugin(mongoosePaginate);
CommentSchema.plugin(mongooseDelete);
CommentSchema.plugin(mongooseAutopopulate);

type CommentDocument = Comment & mongoose.Document;

export { CommentSchema, CommentDocument };
