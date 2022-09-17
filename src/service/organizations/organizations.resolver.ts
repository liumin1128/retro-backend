// import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard, CurrentUser } from '@/service/auth/auth.guard';
import { SignUserPayload } from '@/service/auth/auth.service';
import { OrganizationDocument as Organization } from './organizations.schema';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './organizations.dto';

@Resolver('Organizations')
export class OrganizationsResolver {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Query('findOrganizations')
  async findOrganizations(): Promise<Organization[]> {
    const data = await this.organizationsService.findAll();
    return data;
  }

  @Query('findOrganization')
  async findOrganization(@Args('_id') _id: string): Promise<Organization> {
    const data = await this.organizationsService.findById(_id);
    return data;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('createOrganization')
  async createOrganization(
    @CurrentUser() user: SignUserPayload,
    @Args('input') input: CreateOrganizationDto,
  ): Promise<Organization | null> {
    const createdOrganization = await this.organizationsService.create({
      owner: user,
      ...input,
    });
    return createdOrganization;
  }
}
