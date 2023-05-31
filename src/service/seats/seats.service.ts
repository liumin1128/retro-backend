import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSeatDto, UpdateSeatDto } from './seats.dto';
import { Seat, SeatDocument } from './seats.schema';

@Injectable()
export class SeatsService {
  constructor(
    @InjectModel(Seat.name)
    private readonly seatsModel: Model<SeatDocument>,
  ) {}
  async create(createSeatDto: CreateSeatDto): Promise<SeatDocument> {
    const createdSeat = new this.seatsModel(createSeatDto);
    await createdSeat.save();
    return createdSeat;
  }

  async findAll(): Promise<SeatDocument[]> {
    return this.seatsModel.find();
  }

  async findOne(user: string, object: string): Promise<SeatDocument> {
    return this.seatsModel.findOne({ user, object });
  }

  async findById(_id: string): Promise<SeatDocument> {
    return this.seatsModel.findById(_id);
  }

  async updateSeat(id: string, input: UpdateSeatDto): Promise<any> {
    return this.seatsModel.updateOne({ _id: id }, { $set: input });
  }

  async setSeatsTags(ids: string[], tags: string[]): Promise<any> {
    return this.seatsModel.updateMany(
      { _id: { $in: ids } },
      { $set: { tags } },
    );
  }

  async pushSeatsTags(ids: string[], tags: string[]): Promise<any> {
    return this.seatsModel.updateMany(
      { _id: { $in: ids } },
      { $addToSet: { tags: { $each: tags } } },
    );
  }

  async pullSeatsTags(ids: string[], tags: string[]): Promise<any> {
    return this.seatsModel.updateMany(
      { _id: { $in: ids } },
      { $pull: { tags: { $in: tags } } }, // 使用$pull操作符删除tags数组中的指定元素
      { multi: true, upsert: false }, // 设置multi为true表示更新多个文档，设置upsert为false表示如果不存在则忽略
    );
  }
}
