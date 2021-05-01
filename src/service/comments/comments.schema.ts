import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as mongooseDelete from 'mongoose-delete';
import * as mongooseAutopopulate from 'mongoose-autopopulate';
import { UserDocument } from '@/service/users/schemas/users.schema';

@Schema({ timestamps: true })
export class Comment {
  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: UserDocument;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'objectModel',
    autopopulate: true,
  })
  object: mongoose.Types.ObjectId | unknown;

  @Prop()
  objectModel: string;
}

const CommentSchema = SchemaFactory.createForClass(Comment);

// https://stackoverflow.com/questions/49387454/mongoose-plugins-nestjs
CommentSchema.plugin(mongoosePaginate);
CommentSchema.plugin(mongooseDelete);
CommentSchema.plugin(mongooseAutopopulate);

type CommentDocument = Comment & mongoose.Document;

export { CommentSchema, CommentDocument };
