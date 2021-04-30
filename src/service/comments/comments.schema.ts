import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Comment {
  @Prop()
  content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

export type CommentDocument = Comment & mongoose.Document;
