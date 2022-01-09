import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { pick } from 'lodash/object';
import { md5Encode } from '@/utils/crypto';
import CreateUserDto from './dto/create.dto';
import LoginUserDto from './dto/login.dto';
import RegisterUserDto from './dto/register.dto';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserParams: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserParams);
    return createdUser.save();
  }

  async login(loginUserParams: LoginUserDto): Promise<UserDocument> {
    const query: User = pick(loginUserParams, ['username']);
    const user = await this.userModel.findOne(query);

    if (user) {
      const pwMd5 = md5Encode(loginUserParams.password);
      if (`${pwMd5}` === user.password) {
        // const token = await this.authService.login({ _id: user._id });
        // console.log('token');
        // console.log(token);
        return user;
      }
    }

    throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
  }

  async register(params: RegisterUserDto): Promise<UserDocument> {
    const query: User = pick(params, ['username']);
    const user = await this.userModel.findOne(query);

    if (user) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const encodedPassword = md5Encode(params.password);

    const createdUser = new this.userModel({
      ...params,
      password: encodedPassword,
    });

    return createdUser.save();
  }

  async findById(_id: string): Promise<UserDocument> {
    return this.userModel.findById(_id);
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async updateOne(...args: any[]): Promise<any> {
    return this.userModel.updateOne(...args);
  }
}
