import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRetroMessageDto } from './dto';
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
    return createdRetroMessage.save();
  }

  async findAll(): Promise<RetroMessageDocument[]> {
    return this.retroMessagesModel.find();
  }

  async findById(_id: string): Promise<RetroMessageDocument> {
    return this.retroMessagesModel.findById(_id);
  }
}
