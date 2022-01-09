import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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

  @Query('login')
  async login(@Args('input') args: LoginUserDto): Promise<User> {
    return this.usersService.login(args);
  }

  @Mutation('register')
  async register(@Args('input') args: RegisterUserDto): Promise<User> {
    return this.usersService.register(args);
  }

  @Mutation('createUser')
  async create(@Args('createUsersInput') args: CreateUserDto): Promise<User> {
    return this.usersService.create(args);
  }
}
