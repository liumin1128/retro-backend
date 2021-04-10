import { Module, HttpModule } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { OAuthModule } from '../../database/oauth/oauth.module';
import { OAuthService } from '../../database/oauth/oauth.service';
// import { CatsModule } from '../../database/cats/cats.module';
// import { CatsService } from '../../database/cats/cats.service';

@Module({
  imports: [
    OAuthModule,
    // CatsModule,
    HttpModule,
  ],
  providers: [
    GithubService,
    // CatsService,
    // OAuthService,
  ],
  controllers: [GithubController],
})
export class GithubModule {}
