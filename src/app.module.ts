import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AnalyseService } from './analyse/analyse.service';
// import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
// import { AnalyseController } from './analyse/analyse.controller';
// import { AnalyseModule } from './analyse/analyse.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OauthModule } from './oauth/oauth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    // MongooseModule.forRoot('mongodb://react:123456@localhost:27017/reacts'),
    CatsModule,
    UsersModule,
    OauthModule,
    // AnalyseModule,
  ],
  controllers: [
    AppController,
    // CatsController, AnalyseController
  ],
  // providers: [AppService, AnalyseService],
})
export class AppModule {}
