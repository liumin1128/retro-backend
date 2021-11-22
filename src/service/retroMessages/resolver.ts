// import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard, CurrentUser } from '@/service/auth/auth.guard';
import { SignUserPayload } from '@/service/auth/auth.service';
import { RetroMessageDocument as RetroMessage } from './schema';
import { RetroMessagesService } from './service';
import { CreateRetroMessageDto } from './dto';

const pubSub = new PubSub();

@Resolver('RetroMessages')
export class RetroMessagesResolver {
  constructor(private readonly retroMessagesService: RetroMessagesService) {}

  @Query('retroMessages')
  async getRetroMessages(): Promise<RetroMessage[]> {
    return this.retroMessagesService.findAll();
  }

  @Mutation('createRetroMessage')
  @UseGuards(GqlAuthGuard)
  async create(
    @CurrentUser() user: SignUserPayload,
    @Args('input') args: CreateRetroMessageDto,
  ): Promise<RetroMessage> {
    const createdRetroMessage = await this.retroMessagesService.create({
      user,
      ...args,
    });
    pubSub.publish('retroMessageCreated', {
      retroMessageCreated: createdRetroMessage,
    });
    return createdRetroMessage;
  }

  @Subscription('retroMessageCreated')
  retroMessageCreated() {
    return pubSub.asyncIterator('retroMessageCreated');
  }
}
