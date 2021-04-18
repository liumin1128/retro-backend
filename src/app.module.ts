import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';
import { OAuthModule } from '@/oauth/oauth.module';
import { NewsModule } from '@/service/news/news.module';
import { AppController } from '@/app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://react:123456@localhost:27017/react'),
    AuthModule,
    UsersModule,
    OAuthModule,
    NewsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
