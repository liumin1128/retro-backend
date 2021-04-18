import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsService } from './news.service';
import { News, NewsSchema } from './schemas/news.schema';
import { IDataModule } from '@/utils/idata/idata.module';
import { NewsController } from './news.controller';

@Module({
  imports: [
    IDataModule,
    MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }]),
  ],
  providers: [NewsService],
  exports: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}