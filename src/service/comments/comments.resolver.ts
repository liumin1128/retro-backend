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
import { GqlAuthGuard, CurrentUser } from '@/service/auth/auth.guard';
import { SignUserPayload } from '@/service/auth/auth.service';
import { NewsService } from '@/service/news/news.service';
import { DynamicsService } from '@/service/dynamics/dynamics.service';
import { RetroMessagesService } from '@/service/retros/messages/service';
// import { Comments } from '@/graphql/graphql.schema';
// import { CommentsGuard } from './comments.guard';
import { CommentDocument as Comment } from './comments.schema';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './comments.dto';
import { UseGuards } from '@nestjs/common';

const pubSub = new PubSub();

@Resolver('Comments')
export class CommentsResolver {
  constructor(
    private readonly retroMessagesService: RetroMessagesService,
    private readonly commentsService: CommentsService,
    private readonly newsService: NewsService,
    private readonly dynamicsService: DynamicsService,
  ) {}

  @Query('findComments')
  async findComments(@Args('object') object: string): Promise<Comment[]> {
    console.log('xxx');
    const data = await this.commentsService.findAll(object);
    return data;
  }

  @Query('findComment')
  async findComment(@Args('_id') _id: string): Promise<Comment> {
    const data = await this.commentsService.findById(_id);
    return data;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('createComment')
  async createComment(
    @CurrentUser() user: SignUserPayload,
    @Args('input') input: CreateCommentDto,
  ): Promise<Comment> {
    let object;

    switch (input.objectModel) {
      case 'Comment': {
        object = await this.commentsService.findById(input.object);
        break;
      }
      case 'Dynamic': {
        object = await this.dynamicsService.findById(input.object);
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
      const createdComment = await this.commentsService.create({
        user,
        ...input,
      });

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
