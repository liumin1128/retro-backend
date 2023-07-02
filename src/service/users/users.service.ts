import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { pick } from 'lodash';
import { md5Encode } from '@/utils/crypto';
import { AuthService } from '@/service/auth/auth.service';
import CreateUserDto from './dto/create.dto';
import LoginUserDto from './dto/login.dto';
import RegisterUserDto from './dto/register.dto';
import UpdateUserInfoDto from './dto/update.dto';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly authService: AuthService,
  ) {}

  async create(createUserParams: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserParams);
    return createdUser.save();
  }

  async login(
    loginUserParams: LoginUserDto,
  ): Promise<{ token: string; user: UserDocument }> {
    const query: User = pick(loginUserParams, ['username']);
    const user = await this.userModel.findOne(query);

    if (user) {
      const pwMd5 = md5Encode(loginUserParams.password);
      if (`${pwMd5}` === user.password) {
        const token = await this.authService.login({ _id: user._id });
        return { token, user };
      }
      throw new Error('password not match');
    }

    throw new Error('user not found');
  }

  async register(params: RegisterUserDto): Promise<UserDocument> {
    const query: User = pick(params, ['username']);
    const user = await this.userModel.findOne(query);

    if (user) {
      throw new Error('user exist');
    }

    const pwMd5 = md5Encode(params.password);
    const createdUser = new this.userModel({
      ...params,
      password: pwMd5,
    });

    return createdUser.save();
  }

  async findById(_id: string): Promise<UserDocument> {
    return this.userModel.findById(_id);
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async query(args): Promise<UserDocument[]> {
    const {
      search,
      tags,
      limit = 100,
      skip = 0,
      sortKey = 'createdAt',
      sortOrder = 1,
    } = args;
    const query = {};

    if (search) {
      query['nickname'] = { $regex: '.*' + search + '.*' };
    }

    if (tags) {
      query['tags'] = { $in: tags };
    }

    console.log('query', query);

    return this.userModel
      .find(query)
      .limit(limit)
      .skip(skip)
      .sort({ [sortKey]: sortOrder })
      .exec();
  }

  async updateOne(...args: any[]): Promise<any> {
    return this.userModel.updateOne(...args);
  }

  async findByIdAndUpdate(
    _id: string,
    input: UpdateUserInfoDto,
  ): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(_id, input, {
      new: true,
    });
  }

  async updateUser(id: string, input): Promise<any> {
    return this.userModel.updateOne({ _id: id }, { $set: input });
  }

  async adminPushUsersTags(users: string[], tags: string[]): Promise<any> {
    return this.userModel.updateMany(
      { _id: { $in: users } },
      { $addToSet: { tags: { $each: tags } } },
    );
  }

  async adminPullUsersTags(users: string[], tags: string[]): Promise<any> {
    return this.userModel.updateMany(
      { _id: { $in: users } },
      { $pull: { tags: { $in: tags } } }, // 使用$pull操作符删除tags数组中的指定元素
      { multi: true, upsert: false }, // 设置multi为true表示更新多个文档，设置upsert为false表示如果不存在则忽略
    );
  }
}
