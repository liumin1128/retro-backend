import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as mongooseDelete from 'mongoose-delete';
// import * as mongooseAutopopulate from 'mongoose-autopopulate';

@Schema({ timestamps: true })
export class Interest {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Types.ObjectId;

  @Prop({
    required: true,
    enum: ['Game', 'Pet', 'Digital', 'Peripherals', 'Other'],
  })
  category: string;

  @Prop()
  name: string;

  @Prop()
  cover: string;

  @Prop()
  icon: string;
}

const InterestSchema = SchemaFactory.createForClass(Interest);

// https://stackoverflow.com/questions/49387454/mongoose-plugins-nestjs
InterestSchema.plugin(mongoosePaginate);
InterestSchema.plugin(mongooseDelete);
// InterestSchema.plugin(mongooseAutopopulate);

type InterestDocument = Interest & mongoose.Document;

export { InterestSchema, InterestDocument };
