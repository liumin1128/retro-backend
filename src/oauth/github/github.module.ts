import { Module, HttpModule } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { OAuthModule } from '../../database/oauth/oauth.module';

@Module({
  imports: [OAuthModule, HttpModule],
  providers: [GithubService],
  controllers: [GithubController],
})
export class GithubModule {}
