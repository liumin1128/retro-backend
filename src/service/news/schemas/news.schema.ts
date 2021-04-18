import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class News {
  @Prop()
  title: string;

  @Prop()
  json: string;

  @Prop()
  html: string;

  @Prop()
  appName: string;

  @Prop()
  appCode: string;

  @Prop()
  catLabel1: string;

  @Prop()
  catLabel2: string;

  @Prop()
  url: string;

  @Prop()
  cover: string;

  @Prop()
  content: string;

  @Prop()
  showHtml: boolean;

  @Prop({ type: Array })
  tags: string[];

  @Prop({ type: Array })
  photos: string[];

  @Prop()
  sourceData: mongoose.Schema.Types.Map;
}

export const NewsSchema = SchemaFactory.createForClass(News);

export type NewsDocument = News & mongoose.Document;
