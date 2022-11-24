import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard, CurrentUser } from '@/service/auth/auth.guard';
import { SignUserPayload } from '@/service/auth/auth.service';
import { RetroDocument as Retro } from './retros.schema';
import { RetrosService } from './retros.service';
import { CreateRetroDto } from './retros.dto';
import { UserToOrganizationsService } from '@/service/usertoorganizations/usertoorganizations.service';

const pubSub = new PubSub();

@Resolver('Retros')
export class RetrosResolver {
  constructor(
    private readonly retrosService: RetrosService,
    private readonly userToOrganizationsService: UserToOrganizationsService,
  ) {}

  @Query('findRetro')
  async findRetro(@Args('_id') _id: string): Promise<Retro> {
    return this.retrosService.findById(_id);
  }

  @Query('findRetros')
  @UseGuards(GqlAuthGuard)
  async findRetros(@CurrentUser() user: SignUserPayload): Promise<Retro[]> {
    return this.retrosService.findAll(user?._id);
  }

  @Mutation('createRetro')
  @UseGuards(GqlAuthGuard)
  async create(
    @CurrentUser() user: SignUserPayload,
    @Args('input') args: CreateRetroDto,
  ): Promise<Retro> {
    // 是否存在currentOrganization
    const currentOrganization = await this.userToOrganizationsService.findOne({
      user: user._id,
      isCurrent: true,
    });

    const createdRetro = await this.retrosService.create({
      user,
      organization: currentOrganization.organization._id + '',
      ...args,
    });
    pubSub.publish('retroCreated', { retroCreated: createdRetro });
    return createdRetro;
  }

  @Subscription('retroCreated')
  retroCreated() {
    return pubSub.asyncIterator('retroCreated');
  }
}
