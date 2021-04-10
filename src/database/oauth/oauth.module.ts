import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OAuthService } from './oauth.service';
// import { OAuthController } from './oauth.controller';
import { OAuth, OAuthSchema } from './schemas/oauth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OAuth.name, schema: OAuthSchema }]),
  ],
  providers: [OAuthService],
  exports: [OAuthService],
})
export class OAuthModule {}
