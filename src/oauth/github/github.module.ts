import { Module, HttpModule } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { OAuthModule } from '../../database/oauth/oauth.module';
import { UserModule } from '../../database/user/user.module';

@Module({
  imports: [HttpModule, OAuthModule, UserModule],
  providers: [GithubService],
  controllers: [GithubController],
})
export class GithubModule {}
