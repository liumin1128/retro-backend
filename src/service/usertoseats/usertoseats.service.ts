import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserToSeatDto } from './userToSeats.dto';
import { UserToSeat, UserToSeatDocument } from './userToSeats.schema';

@Injectable()
export class UserToSeatsService {
  constructor(
    @InjectModel(UserToSeat.name)
    private readonly userToSeatsModel: Model<UserToSeatDocument>,
  ) {}
  async create(
    createUserToSeatDto: CreateUserToSeatDto,
  ): Promise<UserToSeatDocument> {
    const createdUserToSeat = new this.userToSeatsModel(createUserToSeatDto);
    await createdUserToSeat.save();
    return createdUserToSeat;
  }

  async findAll(): Promise<UserToSeatDocument[]> {
    return this.userToSeatsModel.find();
  }

  async findOne(user: string, object: string): Promise<UserToSeatDocument> {
    return this.userToSeatsModel.findOne({ user, object });
  }

  async findById(_id: string): Promise<UserToSeatDocument> {
    return this.userToSeatsModel.findById(_id);
  }
}
