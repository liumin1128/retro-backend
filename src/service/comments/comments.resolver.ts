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
// import { Comments } from '@/graphql/graphql.schema';
// import { CommentsGuard } from './comments.guard';
import { CommentDocument as Comment } from './comments.schema';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './comments.dto';

const pubSub = new PubSub();

@Resolver('Comments')
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly newsService: NewsService,
  ) {}

  @Query('commentsList')
  // @UseGuards(CommentsGuard)
  async getComments(): Promise<Comment[]> {
    console.log('xxxx');
    return this.commentsService.findAll();
  }

  @Mutation('createComment')
  async create(
    @Args('createCommentInput') args: CreateCommentDto,
  ): Promise<Comment> {
    let object;

    switch (args.objectModel) {
      case 'Comment': {
        object = await this.commentsService.findById(args.object);
        break;
      }
      case 'News': {
        object = await this.newsService.findById(args.object);
        break;
      }
      default:
        return;
    }

    if (object) {
      const createdComment = await this.commentsService.create(args);
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
  __resolveType(value) {
    if (value.title) {
      return 'News';
    }
    if (value.content) {
      return 'Comment';
    }
    return null;
  }
}
