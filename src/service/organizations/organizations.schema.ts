import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as mongooseDelete from 'mongoose-delete';
import { User } from '@/service/users/schemas/users.schema';
// import * as mongooseAutopopulate from 'mongoose-autopopulate';

@Schema({ timestamps: true })
export class Organization {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: User[];

  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  logo: string;
}

const OrganizationSchema = SchemaFactory.createForClass(Organization);

// https://stackoverflow.com/questions/49387454/mongoose-plugins-nestjs
OrganizationSchema.plugin(mongoosePaginate);
OrganizationSchema.plugin(mongooseDelete);
// OrganizationSchema.plugin(mongooseAutopopulate);

type OrganizationDocument = Organization & mongoose.Document;

export { OrganizationSchema, OrganizationDocument };
