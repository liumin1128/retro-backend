import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDynamicDto } from './dynamics.dto';
import { Dynamic, DynamicDocument } from './dynamics.schema';
import { getDynamicsPipline } from '@/utils/mongo/pipline/dynamics';

@Injectable()
export class DynamicsService {
  constructor(
    @InjectModel(Dynamic.name)
    private readonly dynamicsModel: Model<DynamicDocument>,
  ) {}

  async create(createDynamicDto: CreateDynamicDto): Promise<DynamicDocument> {
    const createdDynamic = new this.dynamicsModel(createDynamicDto);
    return createdDynamic.save();
  }

  async findAll(user: string): Promise<DynamicDocument[]> {
    const pipeline = getDynamicsPipline(user);
    const data = await this.dynamicsModel.aggregate(pipeline);
    return data;
  }

  async findById(_id: string): Promise<DynamicDocument> {
    return this.dynamicsModel.findById(_id);
  }
}
