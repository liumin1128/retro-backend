import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import pick from 'lodash/pick';
import { md5Encode } from '@/utils/crypto';
import CreateUserDto from './dto/create.dto';
import LoginUserDto from './dto/login.dto';
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
    return user;
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
