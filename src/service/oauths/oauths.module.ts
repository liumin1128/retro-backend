import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OAuthsService } from './oauths.service';
// import { GithubService } from './github/github.service';
// import { GithubModule } from './github/github.module';
import { OAuth, OAuthSchema } from './schemas/oauths.schema';
import { OAuthsResolver } from './oauths.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OAuth.name, schema: OAuthSchema }]),
    HttpModule,
    // GithubModule,
  ],
  providers: [OAuthsService, OAuthsResolver],
  exports: [OAuthsService],
})
export class OAuthModule {}
