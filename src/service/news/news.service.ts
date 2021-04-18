import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDataService } from '@/utils/idata/idata.service';
import { CreateNewsDto } from './dto/create.dto';
import { News, NewsDocument } from './schemas/news.schema';

@Injectable()
export class NewsService {
  constructor(
    private readonly idataService: IDataService,
    @InjectModel(News.name) private readonly newsModel: Model<NewsDocument>,
  ) {}

  async create(createNewsDto: CreateNewsDto): Promise<NewsDocument> {
    const createdNews = new this.newsModel(createNewsDto);
    return createdNews.save();
  }

  async getNewsFromIData(): Promise<NewsDocument> {
    try {
      const data = await this.idataService.getNewList({ keyword: 'APPLE' });

      await Promise.all(
        data.data.map(async (i) => {
          console.log('i');
          console.log(i);
          try {
            const doc = await this.newsModel.findOne({
              $or: [{ 'sourceData.id': i.id }, { 'sourceData.title': i.title }],
            });

            if (doc) {
              console.log('已存在：', i.title);
              return;
            }

            const news = await this.idataService.formatNews(i);
            console.log('news');
            console.log(news);
            await this.newsModel.create(news);
            console.log('已写入：', i.title);
          } catch (error) {
            console.log(`写入失败：${i.title}`);
            console.log(error);
          }
        }),
      );

      return;
    } catch (error) {
      console.log('error');
      console.log(error);
    }
  }
}
