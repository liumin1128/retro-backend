import { Module, HttpModule } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { OAuthModule } from '@/database/oauth/oauth.module';
import { UserModule } from '@/database/user/user.module';
import { QiniuModule } from '@/utils/qiniu/qiniu.module';

@Module({
  imports: [HttpModule, OAuthModule, UserModule, QiniuModule],
  providers: [GithubService],
  controllers: [GithubController],
})
export class GithubModule {}
