// import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard, CurrentUser } from '@/service/auth/auth.guard';
import { SignUserPayload } from '@/service/auth/auth.service';
import { ApolloError } from 'apollo-server';
import { RetroMessageDocument as RetroMessage } from './schema';
import { RetroMessagesService } from './service';
import { CreateRetroMessageDto, UpdateRetroMessageDto } from './dto';
import { RetrosService } from '@/service/retros/retros.service';
import { UserToOrganizationsService } from '@/service/usertoorganizations/usertoorganizations.service';
import { pubSub } from '@/utils/subscription';

@Resolver('RetroMessages')
export class RetroMessagesResolver {
  constructor(
    private readonly retroMessagesService: RetroMessagesService,
    private readonly retroService: RetrosService,
    private readonly userToOrganizationsService: UserToOrganizationsService,
  ) {}

  @Query('findRetroMessage')
  async findRetroMessage(@Args('_id') _id: string): Promise<RetroMessage> {
    return this.retroMessagesService.findById(_id);
  }

  @Query('findRetroMessages')
  @UseGuards(GqlAuthGuard)
  async findRetroMessages(
    @CurrentUser() user: SignUserPayload,
    @Args('retro') retro: string,
  ): Promise<RetroMessage[]> {
    // 查找当前retro
    // // const retroObj = await this.retroService.findById(retro);
    //
    // // 查找当前retro的organization是否关联了当前用户
    // const recordObj = await this.userToOrganizationsService.findOne({
    //   user: user._id,
    //   // organization: retroObj.organization._id,
    // });
    // if (!recordObj) {
    //   throw new ApolloError('Permission  denied');
    // }

    return this.retroMessagesService.findAll({ retro });
  }

  @Mutation('createRetroMessage')
  @UseGuards(GqlAuthGuard)
  async create(
    @CurrentUser() user: SignUserPayload,
    @Args('input') input: CreateRetroMessageDto,
  ): Promise<RetroMessage> {
    const createdRetroMessage = await this.retroMessagesService.create({
      user,
      ...input,
    });
    pubSub.publish('retroMessageCreated', {
      retroMessageCreated: createdRetroMessage,
    });
    return createdRetroMessage;
  }

  @Mutation('updateRetroMessage')
  @UseGuards(GqlAuthGuard)
  async update(
    @Args('_id') _id: string,
    @CurrentUser() user: SignUserPayload,
    @Args('input') args: UpdateRetroMessageDto,
  ): Promise<RetroMessage> {
    // 如果改变状态，需要校验retro管理员
    if (args.status) {
      const obj = await (
        await this.retroMessagesService.findById(_id)
      ).populate({
        path: 'retro',
        select: ['user'],
      });

      if (obj.retro.user._id + '' !== user._id + '') {
        throw new ApolloError('403');
      }
    }

    const updatedRetroMessage = await this.retroMessagesService.update(_id, {
      ...args,
    });

    pubSub.publish('retroMessageUpdated', {
      retroMessageUpdated: updatedRetroMessage,
    });

    return updatedRetroMessage;
  }

  @Mutation('deleteRetroMessage')
  @UseGuards(GqlAuthGuard)
  async delete(
    @Args('_id') _id: string,
    @CurrentUser() user: SignUserPayload,
  ): Promise<RetroMessage> {
    // 不进行用户校验，任何人都可以修改retro message
    // const obj = await this.retroMessagesService.findById(_id);
    // if(obj.user._id !== user._id) {
    //   return
    // }

    const deletedRetroMessaged = await this.retroMessagesService.delete(_id);

    pubSub.publish('retroMessageDeleted', {
      retroMessageDeleted: deletedRetroMessaged,
    });

    return deletedRetroMessaged;
  }

  @Mutation('likeRetroMessage')
  @UseGuards(GqlAuthGuard)
  async like(
    @Args('_id') _id: string,
    @Args('count') count: number,
    @CurrentUser() user: SignUserPayload,
  ): Promise<RetroMessage> {
    const likedRetroMessage = await this.retroMessagesService.like(_id, count);
    pubSub.publish('retroMessageLiked', {
      retroMessageLiked: likedRetroMessage,
    });
    return likedRetroMessage;
  }

  @Subscription('retroMessageCreated', {
    filter: (payload, variables) => {
      if (variables.retroID === payload.retroMessageCreated.retro.toString()) {
        return true;
      }
      return false;
    },
  })
  retroMessageCreated() {
    return pubSub.asyncIterator('retroMessageCreated');
  }

  @Subscription('retroMessageUpdated', {
    filter: (payload, variables) => {
      if (variables.retroID === payload.retroMessageUpdated.retro.toString()) {
        return true;
      }
      return false;
    },
  })
  retroMessageUpdated() {
    return pubSub.asyncIterator('retroMessageUpdated');
  }

  @Subscription('retroMessageDeleted', {
    filter: (payload, variables) => {
      if (variables.retroID === payload.retroMessageDeleted.retro.toString()) {
        return true;
      }
      return false;
    },
  })
  retroMessageDeleted() {
    return pubSub.asyncIterator('retroMessageDeleted');
  }

  @Subscription('retroMessageLiked', {
    filter: (payload, variables) => {
      if (variables.retroID === payload.retroMessageLiked.retro.toString()) {
        return true;
      }
      return false;
    },
  })
  retroMessageLiked() {
    return pubSub.asyncIterator('retroMessageLiked');
  }
}
