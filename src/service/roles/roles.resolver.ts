// import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/service/auth/auth.guard';
import { RoleDocument as Role } from './roles.schema';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './roles.dto';

@Resolver('Roles')
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Query('findRoles')
  async findRoles(): Promise<Role[]> {
    const data = await this.rolesService.findAll();
    return data;
  }

  @Query('findRole')
  async findRole(@Args('_id') _id: string): Promise<Role> {
    const data = await this.rolesService.findById(_id);
    return data;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('createRole')
  async createRole(@Args('input') input: CreateRoleDto): Promise<Role | null> {
    const createdRole = await this.rolesService.create({
      ...input,
    });
    return createdRole;
  }
}
