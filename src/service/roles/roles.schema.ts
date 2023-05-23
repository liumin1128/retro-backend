import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as mongooseDelete from 'mongoose-delete';
// import * as mongooseAutopopulate from 'mongoose-autopopulate';

@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true })
  scope: string; // 作用域，限定权限模块，seat，dynamic，retro等

  @Prop({ required: true })
  name: string; // 名称，用于显示

  @Prop()
  description: string;
}

const RoleSchema = SchemaFactory.createForClass(Role);

// https://stackoverflow.com/questions/49387454/mongoose-plugins-nestjs
RoleSchema.plugin(mongoosePaginate);
RoleSchema.plugin(mongooseDelete);
// RoleSchema.plugin(mongooseAutopopulate);

type RoleDocument = Role & mongoose.Document;

export { RoleSchema, RoleDocument };
