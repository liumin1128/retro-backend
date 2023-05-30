// import { ParseIntPipe, UseGuards } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { GqlAuthGuard, CurrentUser } from '@/service/auth/auth.guard';
import { SignUserPayload } from '@/service/auth/auth.service';
import { ApolloError } from 'apollo-server';
import { removeEmptyValue } from '@/utils/common';
import { UserToSeatDocument as UserToSeat } from './usertoseats.schema';
import { UserToSeatsService } from './usertoseats.service';
import { CreateUserToSeatDto, DeleteUserToSeatDto } from './usertoseats.dto';
import { SeatsService } from '../seats/seats.service';
import { UsersService } from '@/service/users/users.service';

const pubSub = new PubSub();

@Resolver('UserToSeats')
export class UserToSeatsResolver {
  constructor(
    private readonly userToSeatsService: UserToSeatsService,
    private readonly seatService: SeatsService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query('findUserToSeats')
  async findUserToSeats(
    @Args('startDate') startDate: number,
    @Args('endDate') endDate: number,
    @Args('seat') seat: string,
    @Args('user') user: string,
  ): Promise<UserToSeat[]> {
    const start = startDate;
    const end = endDate || startDate;

    const query = removeEmptyValue({
      $and: [
        { date: { $gte: start } },
        { date: { $lte: dayjs(end).endOf('day') }.valueOf() },
      ],
      seat,
      user,
    });

    const data = await this.userToSeatsService.findAll(query);
    return data;
  }

  @UseGuards(GqlAuthGuard)
  @Query('findUserToSeat')
  async findUserToSeat(@Args('_id') _id: string): Promise<UserToSeat> {
    return await this.userToSeatsService.findById(_id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('toggleUserToSeat')
  async toggleUserToSeat(
    @CurrentUser() user: SignUserPayload,
    @Args('input') input: CreateUserToSeatDto,
  ): Promise<UserToSeat | null> {
    // 第一步校验权限

    let hasAuth = false;

    if (user._id === input.user) {
      hasAuth = true;
    } else {
      const userObj = await this.userService.findById(user._id);
      if (userObj.tags.includes('SeatSelectionAdmin')) {
        hasAuth = true;
      }
    }

    if (!hasAuth) {
      throw new ApolloError('403 Forbidden');
    }

    // 检查座位是否存在
    const seatObj = await this.seatService.findById(input.seat);

    if (!seatObj) {
      throw new ApolloError('seat not found');
    }

    // 检查用户是否存在
    const userObj = await this.userService.findById(input.user);
    if (!userObj) {
      throw new ApolloError('user not found');
    }

    const curUserToSeat = await this.userToSeatsService.findOne({
      date: input.date,
      user: input.user,
      seat: input.seat,
    });

    if (curUserToSeat) {
      // 如果选座记录存在，取消选座
      await curUserToSeat.remove();

      pubSub.publish('userToSeatDeleted', {
        userToSeatDeleted: curUserToSeat,
      });

      return curUserToSeat;
    }

    // 该座位今日是否有其他人选选择
    const otherUserHasUserToSeat = await this.userToSeatsService.findOne({
      date: input.date,
      seat: input.seat,
    });

    if (otherUserHasUserToSeat) {
      throw new ApolloError('This Seat has been selected');
    }

    // 检查本人今日是否已选其他座
    const currentUserhasUserToSeat = await this.userToSeatsService.findOne({
      date: input.date,
      user: input.user,
    });

    if (currentUserhasUserToSeat) {
      // 如果选座记录存在，移除已有的记录
      currentUserhasUserToSeat.remove();
    }

    // 检查本人今日是否已选其他座，或者该座位今日是否有其他人选选择
    // const todayUserToSeat = await this.userToSeatsService.findOne({
    //   $or: [
    //     { date: input.date, user: input.user },
    //     { date: input.date, seat: input.seat },
    //   ],
    // });

    // 无选座记录，创建选座
    const createdUserToSeat = await this.userToSeatsService.create(input);

    pubSub.publish('userToSeatCreated', {
      userToSeatCreated: createdUserToSeat,
    });

    return createdUserToSeat;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('createUserToSeat')
  async createUserToSeat(
    @CurrentUser() user: SignUserPayload,
    @Args('input') input: CreateUserToSeatDto,
  ): Promise<UserToSeat | null> {
    const { seat, date } = input;

    // 检查座位是否可用，
    const seatObj = await this.seatService.findById(seat);

    if (!seatObj) {
      throw new ApolloError('seat not found');
    }

    // 检查本人今日是否已选座，如果有需要先清除选座
    const userToSeat = await this.userToSeatsService.findOne({
      $or: [
        { date, user },
        { date, seat },
      ],
    });

    if (userToSeat) {
      // 如果选座记录存在，反馈不可以重复选座
      throw new ApolloError('Seats have been selected for this day');
    }

    const createdUserToSeat = await this.userToSeatsService.create({
      user: user._id,
      seat,
      date,
    });

    pubSub.publish('userToSeatCreated', {
      userToSeatCreated: createdUserToSeat,
    });

    return createdUserToSeat;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('deleteUserToSeat')
  async deleteUserToSeat(
    @CurrentUser() user: SignUserPayload,
    @Args('input') input: DeleteUserToSeatDto,
  ): Promise<UserToSeat | null> {
    const { seat, date } = input;

    // 检查座位是否可用，
    const seatObj = await this.seatService.findById(seat);
    if (!seatObj) {
      throw new ApolloError('seat not found');
    }

    // 检查本人今日是否已选座，如果有需要先清除选座
    const query = removeEmptyValue({ date, seat, user });
    const userToSeat = await this.userToSeatsService.findOne(query);

    if (!userToSeat) {
      // 如果选座记录不存在，反馈无法取消选座
      throw new ApolloError('The seat selection record does not exist');
    }

    const userToSeatDeleted = await this.userToSeatsService.delete(
      userToSeat._id,
    );

    pubSub.publish('userToSeatDeleted', {
      userToSeatDeleted: userToSeatDeleted,
    });

    return userToSeatDeleted;
  }

  @Subscription('userToSeatCreated')
  userToSeatCreated() {
    return pubSub.asyncIterator('userToSeatCreated');
  }

  @Subscription('userToSeatDeleted')
  userToSeatDeleted() {
    return pubSub.asyncIterator('userToSeatDeleted');
  }
}
