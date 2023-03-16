import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRetroDto } from './retros.dto';
import { Retro, RetroDocument } from './retros.schema';
import { RetroMessage, RetroMessageDocument } from './messages/schema';
import {
  UserToOrganization,
  UserToOrganizationDocument,
} from '@/service/usertoorganizations/usertoorganizations.schema';

@Injectable()
export class RetrosService {
  constructor(
    @InjectModel(Retro.name)
    private readonly retrosModel: Model<RetroDocument>,

    @InjectModel(RetroMessage.name)
    private readonly retroMessagesModel: Model<RetroMessageDocument>,

    @InjectModel(UserToOrganization.name)
    private readonly userToOrganizationsModel: Model<UserToOrganizationDocument>,
  ) {}

  async create(createRetroDto: CreateRetroDto): Promise<RetroDocument> {
    const createdRetro = new this.retrosModel(createRetroDto);
    await createdRetro.save();
    await createdRetro.populate('user');
    return createdRetro;
  }

  async findAll(user: string): Promise<any> {
    // 获取用户当前Organization
    // const record = await this.userToOrganizationsModel.findOne({
    //   user,
    //   isCurrent: true,
    // });
    //
    // if (!record) {
    //   return [];
    // }

    // https://www.5axxw.com/questions/content/3l0r6i
    return this.retrosModel.aggregate([
      // 关联查询retromessage信息

      {
        $match: {
          $expr: {
            // $eq: ['$organization', record?.organization?._id],
          },
        },
      },

      {
        $sort: {
          createdAt: -1,
        },
      },

      {
        $lookup: {
          from: 'retromessages',
          let: { retro: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$$retro', '$retro'] } } },

            {
              $group: {
                _id: '$type',
                count: { $sum: 1 },
              },
            },

            {
              $project: {
                _id: 0,
                k: '$_id',
                v: '$count',
              },
            },
          ],
          as: 'count',
        },
      },

      {
        $addFields: {
          count: { $arrayToObject: '$count' },
        },
      },

      {
        $lookup: {
          from: 'retromessages',
          let: { retro: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$$retro', '$retro'] } } },

            {
              $project: {
                like: 1,
              },
            },

            {
              $group: {
                _id: null,
                count: { $sum: '$like' },
              },
            },

            {
              $project: {
                _id: 0,
              },
            },
          ],
          as: 'likeCount',
        },
      },

      // 重新组织数据结构
      {
        $addFields: {
          likeCount: { $first: '$likeCount' },
        },
      },

      {
        $addFields: {
          likeCount: '$likeCount.count',
          happyCount: '$count.HAPPY',
          unhappyCount: '$count.UNHAPPY',
          wonderringCount: '$count.WONDERRING',
          todoCount: '$count.TODO',
        },
      },

      {
        $project: {
          count: 0,
        },
      },

      // 关联查询用户信息
      {
        $lookup: {
          from: 'users',
          let: { user: '$user' },
          pipeline: [{ $match: { $expr: { $eq: ['$$user', '$_id'] } } }],
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $addFields: {
          user: '$user',
        },
      },
    ]);
  }

  async findById(_id: string): Promise<RetroDocument> {
    return this.retrosModel.findById(_id).populate('user');
  }
}
