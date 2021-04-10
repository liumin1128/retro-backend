import { Module, HttpModule } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { OAuthService } from './oauth.service';
import { GithubService } from './github/github.service';
import { GithubModule } from './github/github.module';
import { OAuthController } from './oauth.controller';
// import { OAuth, OAuthSchema } from './schemas/oauth.schema';
// import { DatabaseModule } from '../database/database.module';

// import { OAuthModule as OAuthModule2 } from '../database/oauth/oauth.module';
// import { OAuthService as OAuthService2 } from '../database/oauth/oauth.service';

@Module({
  imports: [
    HttpModule,
    GithubModule,
    OAuthModule,
    // OAuthModule2,
    // MongooseModule.forFeature([{ name: OAuth.name, schema: OAuthSchema }]),
    // DatabaseModule,
  ],
  providers: [
    // OAuthService,
    GithubService,
    // OAuthService2
  ],
  controllers: [OAuthController],
})
export class OAuthModule {}
