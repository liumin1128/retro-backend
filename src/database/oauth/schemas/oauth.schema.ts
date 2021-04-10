import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class OAuth {
  @Prop({ required: true })
  platform: string;

  @Prop({ required: true })
  data: mongoose.Schema.Types.Map;
}

export const OAuthSchema = SchemaFactory.createForClass(OAuth);

export type OAuthDocument = OAuth & mongoose.Document;
