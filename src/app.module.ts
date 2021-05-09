import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';
import { OAuthIndexModule } from '@/service/oauths/oauths.index.module';
import { NewsModule } from '@/service/news/news.module';
import { CommentsModule } from '@/service/comments/comments.module';
import { AppController } from '@/app.controller';
import { UpperCaseDirective } from '@/graphql/directives/upper-case.directive';
import { GraphqlModule } from '@/graphql/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://react:123456@localhost:27017/react'),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      typePaths: ['./**/*.graphql'],
      // installSubscriptionHandlers: true,
      definitions: {
        path: './src/graphql/graphql.schema.ts',
        outputAs: 'class',
      },
      schemaDirectives: {
        upper: UpperCaseDirective,
      },
    }),
    // GraphqlPluginsModule,
    GraphqlModule,
    AuthModule,
    UsersModule,
    OAuthIndexModule,
    NewsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
