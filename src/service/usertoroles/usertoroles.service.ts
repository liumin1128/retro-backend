import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserToRoleDto } from './usertoroles.dto';
import { UserToRole, UserToRoleDocument } from './usertoroles.schema';

@Injectable()
export class UserToRolesService {
  constructor(
    @InjectModel(UserToRole.name)
    private readonly userToRolesModel: Model<UserToRoleDocument>,
  ) {}
  async create(
    createUserToRoleDto: CreateUserToRoleDto,
  ): Promise<UserToRoleDocument> {
    const createdUserToRole = new this.userToRolesModel(createUserToRoleDto);
    await createdUserToRole.save();
    return createdUserToRole;
  }

  async findAll(): Promise<UserToRoleDocument[]> {
    return this.userToRolesModel.find();
  }

  async findOne(user: string, object: string): Promise<UserToRoleDocument> {
    return this.userToRolesModel.findOne({ user, object });
  }

  async findById(_id: string): Promise<UserToRoleDocument> {
    return this.userToRolesModel.findById(_id);
  }
}
