import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UserDocument } from '../../user/schemas/user.schema';

@Schema({ timestamps: true })
export class OAuth {
  @Prop({ required: true })
  uuid: string;

  @Prop({ required: true })
  platform: string;

  @Prop({ required: true })
  data: mongoose.Schema.Types.Map;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: UserDocument;
}

export const OAuthSchema = SchemaFactory.createForClass(OAuth);

export type OAuthDocument = OAuth & mongoose.Document;
