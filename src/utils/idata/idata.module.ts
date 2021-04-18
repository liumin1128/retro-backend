import { Module, HttpModule } from '@nestjs/common';
import { IDataService } from './idata.service';
import { QiniuModule } from '@/utils/qiniu/qiniu.module';

@Module({
  imports: [HttpModule, QiniuModule],
  providers: [IDataService],
  exports: [IDataService],
})
export class IDataModule {}
