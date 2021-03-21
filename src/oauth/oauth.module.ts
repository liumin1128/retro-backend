import { Module, HttpModule } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { GithubService } from './github/github.service';
import { GithubModule } from './github/github.module';
import { OauthController } from './oauth.controller';

@Module({
  imports: [HttpModule, GithubModule],
  providers: [OauthService, GithubService],
  controllers: [OauthController],
})
export class OauthModule {}
