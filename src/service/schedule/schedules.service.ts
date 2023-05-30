import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateScheduleDto } from './schedules.dto';
import { Schedule, ScheduleDocument } from './schedules.schema';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectModel(Schedule.name)
    private readonly schedulesModel: Model<ScheduleDocument>,
  ) {}
  async create(
    createScheduleDto: CreateScheduleDto,
  ): Promise<ScheduleDocument> {
    const createdSchedule = new this.schedulesModel(createScheduleDto);
    await createdSchedule.save();
    return createdSchedule.populate('user');
  }

  async findOneAndUpdate(...args): Promise<ScheduleDocument> {
    return this.schedulesModel.findOneAndUpdate(...args).populate('user');
  }

  async query(query): Promise<ScheduleDocument[]> {
    return this.schedulesModel.find(query).populate('user');
  }

  async findAll(): Promise<ScheduleDocument[]> {
    return this.schedulesModel.find();
  }

  async findOne(query): Promise<ScheduleDocument> {
    return this.schedulesModel.findOne(query).populate('user');
  }

  async findById(_id: string): Promise<ScheduleDocument> {
    return this.schedulesModel.findById(_id);
  }

  async switch(
    createScheduleDto: CreateScheduleDto,
  ): Promise<ScheduleDocument> {
    const createdSchedule = new this.schedulesModel(createScheduleDto);
    await createdSchedule.save();
    return createdSchedule.populate('user');
  }
}
