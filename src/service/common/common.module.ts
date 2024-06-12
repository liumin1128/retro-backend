import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { QiniuModule } from '@/utils/qiniu/qiniu.module';

@Module({
  imports: [HttpModule, QiniuModule],
  providers: [CommonService],
  exports: [CommonService],
  controllers: [CommonController],
})
export class CommonModule {}
