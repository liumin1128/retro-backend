import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
// import { News } from '@/graphql/graphql.schema';
import { NewsGuard } from './news.guard';
import { NewsDocument as News } from './schemas/news.schema';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';

const pubSub = new PubSub();

@Resolver('News')
export class NewsResolver {
  constructor(private readonly newsService: NewsService) {}

  @Query('newsList')
  // @UseGuards(NewsGuard)
  async getNews(): Promise<News[]> {
    console.log('xxxx');
    return this.newsService.findAll();
  }

  @Query('news')
  async findById(id: string): Promise<News> {
    return this.newsService.findById(id);
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
