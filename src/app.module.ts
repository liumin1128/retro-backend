import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AnalyseService } from './analyse/analyse.service';
// import { CatsController } from './cats/cats.controller';
// import { CatsModule } from './cats/cats.module';
// import { AnalyseController } from './analyse/analyse.controller';
// import { AnalyseModule } from './analyse/analyse.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GithubModule } from './oauth/github/github.module';
import { OAuthModule } from './oauth/oauth.module';
// import { DatabaseModule } from './database/database.module';
// import { OAuthModule } from './database/oauth/oauth.module';
// import { OAuthService } from './database/oauth/oauth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://react:123456@localhost:27017/react'),
    AuthModule,
    // CatsModule,
    UsersModule,

    // GithubModule,
    OAuthModule,
    // AnalyseModule,
    // DatabaseModule,
  ],
  controllers: [
    AppController,
    // CatsController, AnalyseController
  ],
  providers: [],
})
export class AppModule {}
