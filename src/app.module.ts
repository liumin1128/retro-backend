import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from '@/service/auth/auth.module';
import { OAuthIndexModule } from '@/service/oauths/oauths.index.module';
import { NewsModule } from '@/service/news/news.module';
import { CommentsModule } from '@/service/comments/comments.module';

import { DynamicsModule } from '@/service/dynamics/dynamics.module';
import { AppController } from '@/app.controller';
import { UpperCaseDirective } from '@/graphql/directives/upper-case.directive';
import { AuthDirective } from '@/graphql/directives/auth.directive';
import { GraphqlModule } from '@/graphql/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    MongooseModule.forRoot('mongodb://react:123456@localhost:27017/react'),

    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      typePaths: ['./**/*.graphql'],
      // autoSchemaFile: true,
      definitions: {
        path: './src/graphql/graphql.schema.ts',
        outputAs: 'class',
      },
      schemaDirectives: {
        upper: UpperCaseDirective,
        auth: AuthDirective,
      },
      // context: ({ req }) => ({ headers: req.headers }),
    }),

    GraphqlModule,
    AuthModule,
    OAuthIndexModule,
    NewsModule,
    CommentsModule,
    DynamicsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
