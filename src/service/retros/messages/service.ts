import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateRetroMessageDto, UpdateRetroMessageDto } from './dto';
import { RetroMessage, RetroMessageDocument } from './schema';

@Injectable()
export class RetroMessagesService {
  constructor(
    @InjectModel(RetroMessage.name)
    private readonly retroMessagesModel: Model<RetroMessageDocument>,
  ) {}

  async create(
    createRetroMessageDto: CreateRetroMessageDto,
  ): Promise<RetroMessageDocument> {
    const createdRetroMessage = new this.retroMessagesModel(
      createRetroMessageDto,
    );
    await createdRetroMessage.save();
    await createdRetroMessage.populate('user');
    return createdRetroMessage;
  }

  async update(
    _id: string,
    updateRetroMessageDto: UpdateRetroMessageDto,
  ): Promise<RetroMessageDocument> {
    const obj = await this.retroMessagesModel
      .findByIdAndUpdate(_id, updateRetroMessageDto, { new: true })
      .populate('user');
    return obj;
  }

  async like(_id: string, count: number): Promise<RetroMessageDocument> {
    const obj = await this.retroMessagesModel
      .findByIdAndUpdate(
        _id,
        {
          $inc: { like: count },
        },
        { new: true },
      )
      .populate('user');
    return obj;
  }

  async findAll({ retro }): Promise<RetroMessageDocument[]> {
    return this.retroMessagesModel.aggregate([
      // 匹配文章条件，如果有的话
      { $match: { retro: new Types.ObjectId(retro) } },
      // 关联查询评论集合
      {
        $lookup: {
          from: 'comments', // 关联的集合名
          localField: '_id', // 本地字段
          foreignField: 'object', // 关联的外部字段
          as: 'comments', // 查询结果存储到该字段
        },
      },

      // 关联user
      {
        $lookup: {
          from: 'users', // 关联的集合名
          localField: 'user', // 本地字段
          foreignField: '_id', // 关联的外部字段
          as: 'user', // 查询结果存储到该字段
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

      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    // .find(query)
    // .sort({ updatedAt: -1 })
    // .populate('user');
  }

  async findById(_id: string): Promise<RetroMessageDocument> {
    return this.retroMessagesModel.findById(_id);
  }

  async delete(_id: string): Promise<RetroMessageDocument> {
    const obj = await this.retroMessagesModel.findById(_id).populate('user');
    if (!obj) return;
    await this.retroMessagesModel.deleteOne({ _id });
    return obj;
  }

  async findOne(query): Promise<RetroMessageDocument> {
    return this.retroMessagesModel.findOne(query);
  }

  async find(query): Promise<RetroMessageDocument[]> {
    return this.retroMessagesModel.find(query);
  }

  async updateMany(...args): Promise<any> {
    return this.retroMessagesModel.updateMany(...args);
  }
}
