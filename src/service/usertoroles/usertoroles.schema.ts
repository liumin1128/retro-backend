import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as mongooseDelete from 'mongoose-delete';
// import * as mongooseAutopopulate from 'mongoose-autopopulate';

@Schema({ timestamps: true })
export class UserToRole {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  cover: string;

  @Prop()
  icon: string;
}

const UserToRoleSchema = SchemaFactory.createForClass(UserToRole);

// https://stackoverflow.com/questions/49387454/mongoose-plugins-nestjs
UserToRoleSchema.plugin(mongoosePaginate);
UserToRoleSchema.plugin(mongooseDelete);
// UserToRoleSchema.plugin(mongooseAutopopulate);

type UserToRoleDocument = UserToRole & mongoose.Document;

export { UserToRoleSchema, UserToRoleDocument };
