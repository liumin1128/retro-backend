// import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
// import { Comments } from '@/graphql/graphql.schema';
// import { CommentsGuard } from './comments.guard';
import { CommentDocument as Comment } from './comments.schema';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './comments.dto';

const pubSub = new PubSub();

@Resolver('Comments')
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

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
    const createdComments = await this.commentsService.create(args);
    pubSub.publish('commentCreated', { commentCreated: createdComments });
    return createdComments;
  }

  @Subscription('commentCreated')
  commentCreated() {
    return pubSub.asyncIterator('commentCreated');
  }
}
