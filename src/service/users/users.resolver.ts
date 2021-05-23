// import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
// import { Users } from '@/graphql/graphql.schema';
// import { UsersGuard } from './users.guard';
import { UserDocument as User } from './schemas/users.schema';
import { UsersService } from './users.service';
import { CreateUserDto, RegisterUserDto } from './dto/create.dto';

const pubSub = new PubSub();

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('users')
  // @UseGuards(UsersGuard)
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Mutation('register')
  async register(@Args('input') args: RegisterUserDto): Promise<User> {
    const params = {
      username: 'zx',
    };
    const createdUsers = await this.usersService.create(params);
    return createdUsers;
  }

  // @Query('user')
  // async findById(_id: string): Promise<User> {
  //   return this.usersService.findById(id);
  // }

  @Mutation('createUser')
  async create(@Args('createUsersInput') args: CreateUserDto): Promise<User> {
    const createdUsers = await this.usersService.create(args);
    // pubSub.publish('usersCreated', { usersCreated: createdUsers });
    return createdUsers;
  }

  // @Subscription('usersCreated')
  // usersCreated() {
  //   return pubSub.asyncIterator('usersCreated');
  // }
}
