// import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '@/service/auth/auth.guard';
import { SignUserPayload } from '@/service/auth/auth.service';
import { OrganizationDocument as Organization } from './organizations.schema';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './organizations.dto';

@Resolver('Organizations')
export class OrganizationsResolver {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Query('findOrganizations')
  async findOrganizations(): Promise<Organization[]> {
    return await this.organizationsService.findAll();
  }

  @Query('findOrganization')
  async findOrganization(@Args('_id') _id: string): Promise<Organization> {
    return await this.organizationsService.findById(_id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('createOrganization')
  async createOrganization(
    @CurrentUser() user: SignUserPayload,
    @Args('input') input: CreateOrganizationDto,
  ): Promise<Organization | null> {
    return await this.organizationsService.create({
      ...input,
      owner: user._id,
      users: [user._id],
    });
  }
}
