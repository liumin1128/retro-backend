import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from '@/service/users/users.service';
import { UserDocument as User } from '@/service/users/schemas/users.schema';
import { UserInputError } from 'apollo-server';
import { SignUserPayload } from '@/service/auth/auth.service';
import { CurrentUser, GqlAuthGuard } from '@/service/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import CreateUserDto from './dto/create.dto';
import UpdateUserInfoDto, { AdminUpdateUserInfoDto } from './dto/update.dto';
import RegisterUserDto from './dto/register.dto';
import LoginUserDto from './dto/login.dto';

@Resolver('Users')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, // private readonly authService: AuthService,
  ) {}

  @Query('findUsers')
  async findUsers(
    @Args('limit') limit?: number,
    @Args('skip') skip?: number,
    @Args('search') search?: string,
    @Args('tags') tags?: string[],
    @Args('sortKey') sortKey?: string,
    @Args('sortOrder') sortOrder?: number,
  ): Promise<User[]> {
    return this.usersService.query({
      limit,
      skip,
      search,
      tags,
      sortKey,
      sortOrder,
    });
  }

  @Query('findUser')
  async findUser(@Args('_id') _id: string): Promise<User> {
    return this.usersService.findById(_id);
  }

  @Query('findUserInfo')
  @UseGuards(GqlAuthGuard)
  async findUserInfo(@CurrentUser() user: SignUserPayload): Promise<User> {
    return this.usersService.findById(user._id);
  }

  @Query('login')
  async login(
    @Args('input') args: LoginUserDto,
  ): Promise<{ token: string; user: User }> {
    try {
      return await this.usersService.login(args);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }

  @Mutation('register')
  async register(@Args('input') args: RegisterUserDto): Promise<User> {
    try {
      return await this.usersService.register(args);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }

  @Mutation('createUser')
  async create(@Args('createUsersInput') args: CreateUserDto): Promise<User> {
    return this.usersService.create(args);
  }

  @Mutation('updateUserInfo')
  @UseGuards(GqlAuthGuard)
  async updateUserInfo(
    @CurrentUser() user: SignUserPayload,
    @Args('input') args: UpdateUserInfoDto,
  ): Promise<User> {
    // console.log('args');
    // console.log(args);
    return this.usersService.findByIdAndUpdate(user._id, args);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('adminUpdateUserInfo')
  async adminUpdateUserInfo(
    @Args('id') id: string,
    @Args('input') input: AdminUpdateUserInfoDto,
  ): Promise<any> {
    console.log(id, input);
    return this.usersService.updateUser(id, input);
  }

  @Mutation('adminPushUsersTags')
  @UseGuards(GqlAuthGuard)
  async adminPushUsersTags(
    @CurrentUser() user: SignUserPayload,
    @Args('users') users: string[],
    @Args('tags') tags: string[],
  ): Promise<User> {
    return this.usersService.adminPushUsersTags(users, tags);
  }

  @Mutation('adminPullUsersTags')
  @UseGuards(GqlAuthGuard)
  async adminPullUsersTags(
    @CurrentUser() user: SignUserPayload,
    @Args('users') users: string[],
    @Args('tags') tags: string[],
  ): Promise<User> {
    return this.usersService.adminPullUsersTags(users, tags);
  }
}
