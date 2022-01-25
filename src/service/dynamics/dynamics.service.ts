import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDynamicDto } from './dynamics.dto';
import { Dynamic, DynamicDocument } from './dynamics.schema';

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

  async findAll(): Promise<DynamicDocument[]> {
    const sort = [['createdAt', -1]];
    return this.dynamicsModel.find().sort(sort).populate('user');
  }

  async findById(_id: string): Promise<DynamicDocument> {
    return this.dynamicsModel.findById(_id);
  }
}
