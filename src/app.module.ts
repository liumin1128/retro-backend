import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from '@/service/auth/auth.module';
import { OAuthIndexModule } from '@/service/oauths/oauths.index.module';
import { NewsModule } from '@/service/news/news.module';
import { CommentsModule } from '@/service/comments/comments.module';
import { DynamicsModule } from '@/service/dynamics/dynamics.module';
import { RetrosModule } from '@/service/retros/retros.module';
import { RetroMessagesModule } from '@/service/retros/messages/module';
import { AppController } from '@/app.controller';
import { GraphqlModule } from '@/graphql/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    MongooseModule.forRoot('mongodb://react:123456@localhost:27017/react'),

    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: './src/graphql/graphql.schema.ts',
        outputAs: 'class',
      },
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
    GraphqlModule,
    AuthModule,
    OAuthIndexModule,
    NewsModule,
    CommentsModule,
    DynamicsModule,
    RetrosModule,
    RetroMessagesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
