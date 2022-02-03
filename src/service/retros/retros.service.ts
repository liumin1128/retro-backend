import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRetroDto } from './retros.dto';
import { Retro, RetroDocument } from './retros.schema';
import { RetroMessage, RetroMessageDocument } from './messages/schema';

@Injectable()
export class RetrosService {
  constructor(
    @InjectModel(Retro.name)
    private readonly retrosModel: Model<RetroDocument>,

    @InjectModel(RetroMessage.name)
    private readonly retroMessagesModel: Model<RetroMessageDocument>,
  ) {}

  async create(createRetroDto: CreateRetroDto): Promise<RetroDocument> {
    const createdRetro = new this.retrosModel(createRetroDto);
    await createdRetro.save();
    await createdRetro.populate('user');
    return createdRetro;
  }

  async findAll(): Promise<any> {
    // 不需要使用这种老套的方法
    // happyCount: {
    //   $sum: {
    //     $cond: [{ $eq: ['$type', 'HAPPY'] }, 1, 0],
    //   },
    // },

    // https://www.5axxw.com/questions/content/3l0r6i
    const data = await this.retrosModel.aggregate([
      // 关联查询retromessage信息

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

    return data;
  }

  async findById(_id: string): Promise<RetroDocument> {
    return this.retrosModel.findById(_id).populate('user');
  }
}
