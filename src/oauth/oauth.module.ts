import { Module, HttpModule } from '@nestjs/common';
import { GithubService } from './github/github.service';
import { GithubModule } from './github/github.module';

@Module({
  imports: [HttpModule, GithubModule],
  providers: [GithubService],
})
export class OAuthModule {}
