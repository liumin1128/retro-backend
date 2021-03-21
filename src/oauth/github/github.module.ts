import { Module, HttpModule } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [HttpModule, DatabaseModule],
  controllers: [GithubController],
  providers: [GithubService],
})
export class GithubModule {}
