// import { ParseIntPipe, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  Subscription,
  ResolveField,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NewsService } from '@/service/news/news.service';
import { RetroMessagesService } from '@/service/retros/messages/service';
// import { Comments } from '@/graphql/graphql.schema';
// import { CommentsGuard } from './comments.guard';
import { CommentDocument as Comment } from './comments.schema';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './comments.dto';

const pubSub = new PubSub();

@Resolver('Comments')
export class CommentsResolver {
  constructor(
    private readonly retroMessagesService: RetroMessagesService,
    private readonly commentsService: CommentsService,
    private readonly newsService: NewsService,
  ) {}

  @Query('comments')
  // @UseGuards(CommentsGuard)
  async getComments(): Promise<Comment[]> {
    const data = await this.commentsService.findAll();
    return data;
  }

  @Mutation('createComment')
  async create(@Args('input') input: CreateCommentDto): Promise<Comment> {
    let object;

    switch (input.objectModel) {
      case 'Comment': {
        object = await this.commentsService.findById(input.object);
        break;
      }
      case 'News': {
        object = await this.newsService.findById(input.object);
        break;
      }
      case 'RetroMessage': {
        object = await this.retroMessagesService.findById(input.object);
        break;
      }
      default:
        return;
    }

    if (object) {
      const createdComment = await this.commentsService.create(input);
      createdComment.object = object;
      pubSub.publish('commentCreated', { commentCreated: createdComment });
      return createdComment;
    }
  }

  @Subscription('commentCreated')
  commentCreated() {
    return pubSub.asyncIterator('commentCreated');
  }
}

@Resolver('CommentObjectUnion')
export class CommentObjectUnionResolver {
  @ResolveField()
  __resolveType(value, context, info) {
    console.log('value, context, info');
    console.log(value, context, info);
    if (value.title) {
      return 'News';
    }
    if (value.status) {
      return 'RetroMessage';
    }
    if (value.content) {
      return 'Comment';
    }
    return null;
  }
}
