import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserToRoleDto } from './usertoroles.dto';
import { UserToRole, UserToRoleDocument } from './usertoroles.schema';
import { User, UserDocument } from '@/service/users/schemas/users.schema';

@Injectable()
export class UserToRolesService {
  constructor(
    @InjectModel(UserToRole.name)
    private readonly userToRolesModel: Model<UserToRoleDocument>,

    @InjectModel(User.name)
    private readonly usersModel: Model<UserDocument>,
  ) {}
  async create(
    createUserToRoleDto: CreateUserToRoleDto,
  ): Promise<UserToRoleDocument> {
    const createdUserToRole = new this.userToRolesModel(createUserToRoleDto);
    await createdUserToRole.save();
    return createdUserToRole;
  }

  async findScopeUsers({
    scope,
    role,
    user,
    limit = 100,
    skip = 0,
  }): Promise<UserDocument[]> {
    const match: any = {
      'role.scope': scope,
    };
    if (role) {
      match['role._id'] = new Types.ObjectId(role);
    }
    if (user) {
      match['user._id'] = new Types.ObjectId(user);
    }
    return this.usersModel.aggregate([
      {
        // 通过 $lookup 进行关联查询连接表
        $lookup: {
          from: 'usertoroles',
          localField: '_id',
          foreignField: 'user',
          as: 'userToRoles',
          pipeline: [
            { $match: { $expr: { $eq: ['$scope', 'seatselection'] } } },
          ],
        },
      },
      {
        $unwind: '$userToRoles',
      },

      {
        $lookup: {
          from: 'roles',
          localField: 'userToRoles.role',
          foreignField: '_id',
          as: 'userToRoles.role',
        },
      },

      {
        $unwind: '$userToRoles.role',
      },

      {
        $group: {
          _id: '$_id',
          username: { $first: '$username' },
          nickname: { $first: '$nickname' },
          avatarUrl: { $first: '$avatarUrl' },
          roles: { $push: '$userToRoles.role' },
        },
      },
      // 保留数组字段和数组长度
      {
        $project: {
          roles: 1,
          username: 1,
          nickname: 1,
          avatarUrl: 1,
          roleSize: { $size: '$roles' },
        },
      },

      {
        $match: {
          roleSize: { $gt: 0 },
          _id: new Types.ObjectId('61dc771bde107749d47e0fe3'),
        },
      },

      { $project: { roleSize: 0 } },
    ]);
    // 下面是查询符合条件的关系表，但是返回的是关系表，不是用户
    // return this.userToRolesModel.aggregate([
    //   {
    //     $lookup: {
    //       from: 'roles',
    //       localField: 'role',
    //       foreignField: '_id',
    //       as: 'role',
    //     },
    //   },
    //   {
    //     $unwind: '$role',
    //   },
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: 'user',
    //       foreignField: '_id',
    //       as: 'user',
    //     },
    //   },
    //   {
    //     $unwind: '$user',
    //   },
    //   {
    //     $match: match,
    //   },
    //   {
    //     $limit: limit,
    //   },
    //   {
    //     $skip: skip,
    //   },
    // ]);
  }

  async findAll(): Promise<UserToRoleDocument[]> {
    return this.userToRolesModel.find().populate('user').populate('role');
  }

  async findOne(user: string, object: string): Promise<UserToRoleDocument> {
    return this.userToRolesModel.findOne({ user, object });
  }

  async findById(_id: string): Promise<UserToRoleDocument> {
    return this.userToRolesModel.findById(_id);
  }
}
