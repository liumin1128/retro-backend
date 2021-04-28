import { Module, HttpModule } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { OAuthModule } from '@/service/oauths/oauths.module';
import { UserModule } from '@/service/users/users.module';
import { AuthModule } from '@/auth/auth.module';
import { QiniuModule } from '@/utils/qiniu/qiniu.module';

@Module({
  imports: [OAuthModule, HttpModule, UserModule, QiniuModule, AuthModule],
  providers: [GithubService],
  controllers: [GithubController],
})
export class GithubModule {}
