import { Module } from '@nestjs/common';
import { AnalyseService } from './analyse.service';

@Module({
  providers: [AnalyseService],
})
export class AnalyseModule {}
