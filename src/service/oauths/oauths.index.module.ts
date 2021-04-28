import { Module } from '@nestjs/common';
import { OAuthModule } from './oauths.module';
import { GithubModule } from './github/github.module';
@Module({
  imports: [OAuthModule, GithubModule],
})
export class OAuthIndexModule {}
