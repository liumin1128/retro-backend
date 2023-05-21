import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as mongooseDelete from 'mongoose-delete';
// import * as mongooseAutopopulate from 'mongoose-autopopulate';

@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Types.ObjectId;
}

const RoleSchema = SchemaFactory.createForClass(Role);

// https://stackoverflow.com/questions/49387454/mongoose-plugins-nestjs
RoleSchema.plugin(mongoosePaginate);
RoleSchema.plugin(mongooseDelete);
// RoleSchema.plugin(mongooseAutopopulate);

type RoleDocument = Role & mongoose.Document;

export { RoleSchema, RoleDocument };
