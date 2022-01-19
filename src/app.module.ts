import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { CommonModule } from '@/service/common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),

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
    CommonModule,
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
