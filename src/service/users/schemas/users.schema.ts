import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop()
  nickname: string;

  @Prop()
  avatarUrl: string;

  @Prop()
  sex: number;

  @Prop()
  sign: string;

  @Prop()
  birthday: Date;

  @Prop()
  position: string;

  @Prop()
  company: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;
