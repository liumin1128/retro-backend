import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HttpException, HttpStatus } from '@nestjs/common';
import { md5Encode } from '@/utils/crypto';
// import { AuthService } from '@/service/auth/auth.service';
import { UsersService } from '@/service/users/users.service';
import { UserDocument as User } from '@/service/users/schemas/users.schema';
import CreateUserDto from './dto/create.dto';
import RegisterUserDto from './dto/register.dto';
import LoginUserDto from './dto/login.dto';

@Resolver('Users')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, // private readonly authService: AuthService,
  ) {}

  @Query('users')
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

  @Mutation('login')
  async login(@Args('input') args: LoginUserDto): Promise<User> {
    console.log('args');
    console.log(args);
    const user = await this.usersService.login(args);
    if (user) {
      const pwMd5 = md5Encode(args.password);
      if (`${pwMd5}` === user.password) {
        // const token = await this.authService.login({ _id: user._id });
        // console.log('token');
        // console.log(token);
        return user;
      }
    }
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Mutation('createUser')
  async create(@Args('createUsersInput') args: CreateUserDto): Promise<User> {
    const createdUsers = await this.usersService.create(args);
    return createdUsers;
  }
}
