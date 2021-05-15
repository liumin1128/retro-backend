// import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
// import { OAuths } from '@/graphql/graphql.schema';
// import { OAuthsGuard } from './oauths.guard';
import { OAuthDocument as OAuth } from './schemas/oauths.schema';
import { OAuthsService } from './oauths.service';
import { CreateOAuthDto } from './dto/create.dto';

const pubSub = new PubSub();

@Resolver('OAuths')
export class OAuthsResolver {
  constructor(private readonly oauthsService: OAuthsService) {}

  @Query('oauthsList')
  // @UseGuards(OAuthsGuard)
  async getOAuths(): Promise<OAuth[]> {
    return this.oauthsService.findAll();
  }

  // @Query('oauth')
  // async findById(id: string): Promise<OAuth> {
  //   return this.oauthsService.findById(id);
  // }

  @Mutation('createOAuth')
  async create(
    @Args('createOAuthsInput') args: CreateOAuthDto,
  ): Promise<OAuth> {
    const createdOAuths = await this.oauthsService.create(args);
    pubSub.publish('oauthsCreated', { oauthsCreated: createdOAuths });
    return createdOAuths;
  }

  // @Subscription('oauthsCreated')
  // oauthsCreated() {
  //   return pubSub.asyncIterator('oauthsCreated');
  // }
}
