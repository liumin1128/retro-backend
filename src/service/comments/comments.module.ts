import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IDataModule } from '@/utils/idata/idata.module';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { Comment, CommentSchema } from './comments.schema';
import { CommentsController } from './comments.controller';

@Module({
  imports: [
    IDataModule,
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  providers: [CommentsService, CommentsResolver],
  exports: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
