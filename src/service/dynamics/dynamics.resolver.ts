// import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard, CurrentUser } from '@/service/auth/auth.guard';
import { SignUserPayload } from '@/service/auth/auth.service';
import { DynamicDocument as Dynamic } from './dynamics.schema';
import { DynamicsService } from './dynamics.service';
import { CreateDynamicDto } from './dynamics.dto';

const pubSub = new PubSub();

@Resolver('Dynamics')
export class DynamicsResolver {
  constructor(private readonly dynamicsService: DynamicsService) {}

  @Query('findDynamics')
  async findDynamics(): Promise<Dynamic[]> {
    return this.dynamicsService.findAll();
  }

  @Query('findDynamic')
  async findDynamic(@Args('_id') _id: string): Promise<Dynamic> {
    return this.dynamicsService.findById(_id);
  }

  @Mutation('createDynamic')
  @UseGuards(GqlAuthGuard)
  async create(
    @CurrentUser() user: SignUserPayload,
    @Args('input') args: CreateDynamicDto,
  ): Promise<Dynamic> {
    const createdDynamic = await this.dynamicsService.create({ user, ...args });
    pubSub.publish('dynamicCreated', { dynamicCreated: createdDynamic });
    return createdDynamic;
  }

  @Subscription('dynamicCreated')
  dynamicCreated() {
    return pubSub.asyncIterator('dynamicCreated');
  }
}
