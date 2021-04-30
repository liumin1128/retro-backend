import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IDataModule } from '@/utils/idata/idata.module';
import { CommentsService } from './comments.service';
import {
  CommentsResolver,
  CommentObjectUnionResolver,
} from './comments.resolver';
import { NewsModule } from '@/service/news/news.module';
import { Comment, CommentSchema } from './comments.schema';
import { CommentsController } from './comments.controller';

@Module({
  imports: [
    IDataModule,
    NewsModule,
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  providers: [CommentsService, CommentsResolver, CommentObjectUnionResolver],
  exports: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
