import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
// import { News } from '@/graphql/graphql.schema';
import { NewsGuard } from './news.guard';
import { NewsDocument as News } from './schemas/news.schema';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { pubSub } from '@/utils/subscription';

@Resolver('News')
export class NewsResolver {
  constructor(private readonly newsService: NewsService) {}

  @Query('newsList')
  // @UseGuards(NewsGuard)
  async getNews(): Promise<News[]> {
    return this.newsService.findAll();
  }

  @Query('news')
  async findById(@Args('_id') _id: string): Promise<News> {
    return this.newsService.findById(_id);
  }

  @Mutation('createNews')
  async create(@Args('createNewsInput') args: CreateNewsDto): Promise<News> {
    const createdNews = await this.newsService.create(args);
    pubSub.publish('newsCreated', { newsCreated: createdNews });
    return createdNews;
  }

  @Subscription('newsCreated')
  newsCreated() {
    return pubSub.asyncIterator('newsCreated');
  }
}
