import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikesService } from './interests.service';
import { LikesResolver, LikeObjectUnionResolver } from './interests.resolver';
import { NewsModule } from '@/service/news/news.module';
import { CommentsModule } from '@/service/comments/comments.module';
import { DynamicsModule } from '@/service/dynamics/dynamics.module';
import { RetroMessagesModule } from '@/service/retros/messages/module';
import { Like, LikeSchema } from './interests.schema';
import { LikesController } from './interests.controller';

@Module({
  imports: [
    DynamicsModule,
    NewsModule,
    RetroMessagesModule,
    CommentsModule,
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
  ],
  providers: [LikesService, LikesResolver, LikeObjectUnionResolver],
  exports: [LikesService],
  controllers: [LikesController],
})
export class LikesModule {}
