import { AuthModule } from '@/service/auth/auth.module';
import { OAuthIndexModule } from '@/service/oauths/oauths.index.module';
import { NewsModule } from '@/service/news/news.module';
import { InterestsModule } from '@/service/interests/interests.module';
import { CommentsModule } from '@/service/comments/comments.module';
import { LikesModule } from '@/service/likes/likes.module';
import { DynamicsModule } from '@/service/dynamics/dynamics.module';
import { RetrosModule } from '@/service/retros/retros.module';
import { RetroMessagesModule } from '@/service/retros/messages/module';
import { CommonModule } from '@/service/common/common.module';

export default [
  CommonModule,
  AuthModule,
  OAuthIndexModule,
  NewsModule,
  CommentsModule,
  LikesModule,
  DynamicsModule,
  RetrosModule,
  RetroMessagesModule,
  InterestsModule,
];
