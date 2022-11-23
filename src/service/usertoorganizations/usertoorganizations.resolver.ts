// import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '@/service/auth/auth.guard';
import { SignUserPayload } from '@/service/auth/auth.service';
import { UserToOrganizationDocument as UserToOrganization } from './usertoorganizations.schema';
import { UserToOrganizationsService } from './usertoorganizations.service';
import { OrganizationsService } from '@/service/organizations/organizations.service';
import { UsersService } from '@/service/users/users.service';
import { CreateUserToOrganizationDto } from './usertoorganizations.dto';
import { CreateOrganizationDto } from '@/service/organizations/organizations.dto';
import { OrganizationDocument as Organization } from '@/service/organizations/organizations.schema';

@Resolver('UserToOrganizations')
export class UserToOrganizationsResolver {
  constructor(
    private readonly userToOrganizationsService: UserToOrganizationsService,
    private readonly organizationsService: OrganizationsService,
    private readonly userService: UsersService,
  ) {}

  @Query('findMyOrganizations')
  async findMyOrganizations(
    @CurrentUser() user: SignUserPayload,
  ): Promise<UserToOrganization[]> {
    const params: Record<any, unknown> = {};
    if (user) {
      params.user = user;
    }
    return await this.userToOrganizationsService.findAll(params);
  }

  @Query('findUserToOrganizations')
  async findUserToOrganizations(
    @Args('user') user: string,
    @Args('organization') organization: string,
  ): Promise<UserToOrganization[]> {
    const params: Record<any, unknown> = {};
    if (organization) {
      params.organization = organization;
    }
    if (user) {
      params.user = user;
    }
    return await this.userToOrganizationsService.findAll(params);
  }

  @Query('findUserToOrganization')
  async findUserToOrganization(
    @Args('_id') _id: string,
  ): Promise<UserToOrganization> {
    return await this.userToOrganizationsService.findById(_id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('organizationInviteUser')
  async organizationInviteUser(
    @CurrentUser() user: SignUserPayload,
    @Args('input') input: CreateUserToOrganizationDto,
  ): Promise<UserToOrganization> {
    // 检查organization
    const organization = await this.organizationsService.findById(
      input.organization,
    );
    if (!organization) {
      throw new Error('Organization not found');
    }

    // 检查user
    const objuser = await this.userService.findById(input.user);
    if (!objuser) {
      throw new Error('User not found');
    }

    // 检查权限
    if (organization.owner._id + '' !== user._id) {
      throw new Error('Permission denied');
    }

    // 是否已经加入
    const joinedCrganization = await this.userToOrganizationsService.findOne({
      user: input.user,
      organization: input.organization,
    });
    if (joinedCrganization) {
      throw new Error('User Joined');
    }

    // 是否存在currentOrganization
    const hasCurrentOrganization =
      await this.userToOrganizationsService.findOne({
        user: input.user,
        isCurrent: true,
      });

    return await this.userToOrganizationsService.create({
      ...input,
      isCurrent: !hasCurrentOrganization,
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('createOrganization')
  async createOrganization(
    @CurrentUser() user: SignUserPayload,
    @Args('input') input: CreateOrganizationDto,
  ): Promise<Organization | null> {
    const organization = await this.organizationsService.create({
      ...input,
      owner: user._id,
    });

    // 是否存在currentOrganization
    const hasCurrentOrganization =
      await this.userToOrganizationsService.findOne({
        user: user._id,
        isCurrent: true,
      });

    // 加入新创建的Organization
    await this.userToOrganizationsService.create({
      user: user._id,
      organization: organization._id + '',
      isCurrent: !hasCurrentOrganization,
    });

    return organization;
  }
}
