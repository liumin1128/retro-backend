import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsertoseatDto } from './usertoseats.dto';
import { Usertoseat, UsertoseatDocument } from './usertoseats.schema';

@Injectable()
export class UsertoseatsService {
  constructor(
    @InjectModel(Usertoseat.name)
    private readonly usertoseatsModel: Model<UsertoseatDocument>,
  ) {}
  async create(
    createUsertoseatDto: CreateUsertoseatDto,
  ): Promise<UsertoseatDocument> {
    const createdUsertoseat = new this.usertoseatsModel(createUsertoseatDto);
    await createdUsertoseat.save();
    return createdUsertoseat;
  }

  async findAll(): Promise<UsertoseatDocument[]> {
    return this.usertoseatsModel.find().populate('owner');
  }

  async findOne(params: Record<string, unknown>): Promise<UsertoseatDocument> {
    return this.usertoseatsModel.findOne(params).populate('owner');
  }

  async findById(_id: string): Promise<UsertoseatDocument> {
    return this.usertoseatsModel.findById(_id);
  }
}
