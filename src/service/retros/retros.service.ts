import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRetroDto } from './retros.dto';
import { Retro, RetroDocument } from './retros.schema';

@Injectable()
export class RetrosService {
  constructor(
    @InjectModel(Retro.name)
    private readonly retrosModel: Model<RetroDocument>,
  ) {}

  async create(createRetroDto: CreateRetroDto): Promise<RetroDocument> {
    const createdRetro = new this.retrosModel(createRetroDto);
    return createdRetro.save();
  }

  async findAll(): Promise<RetroDocument[]> {
    return this.retrosModel.find();
  }

  async findById(_id: string): Promise<RetroDocument> {
    return this.retrosModel.findById(_id);
  }
}
