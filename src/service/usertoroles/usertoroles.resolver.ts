// import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/service/auth/auth.guard';
import { UserToRoleDocument as UserToRole } from './usertoroles.schema';
import { UserToRolesService } from './usertoroles.service';
import { CreateUserToRoleDto } from './usertoroles.dto';
import { UserDocument } from '@/service/users/schemas/users.schema';

@Resolver('UserToRoles')
export class UserToRolesResolver {
  constructor(private readonly userToRolesService: UserToRolesService) {}

  @Query('findSeatSelectionUsers')
  async findSeatSelectionUsers(
    @Args('limit') limit?: number,
    @Args('skip') skip?: number,
    @Args('role') role?: string,
    @Args('user') user?: string,
  ): Promise<UserDocument[]> {
    const data = await this.userToRolesService.findScopeUsers({
      limit,
      skip,
      role,
      user,
      scope: 'seatselection',
    });
    return data;
  }

  @Query('findUserToRoles')
  async findUserToRoles(): Promise<UserToRole[]> {
    const data = await this.userToRolesService.findAll();
    return data;
  }

  @Query('findUserToRole')
  async findUserToRole(@Args('_id') _id: string): Promise<UserToRole> {
    const data = await this.userToRolesService.findById(_id);
    return data;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('createUserToRole')
  async createUserToRole(
    @Args('input') input: CreateUserToRoleDto,
  ): Promise<UserToRole | null> {
    const createdUserToRole = await this.userToRolesService.create({
      ...input,
      index: `scope:${input.scope}_user:${input.user}_role:${input.role}`,
    });

    return createdUserToRole;
  }
}
