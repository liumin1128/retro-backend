// import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { GqlAuthGuard, CurrentUser } from '@/service/auth/auth.guard';
import { SignUserPayload } from '@/service/auth/auth.service';
import { ApolloError } from 'apollo-server';
import { ScheduleDocument as Schedule } from './schedules.schema';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './schedules.dto';
import { removeEmptyValue } from '@/utils/common';
import * as dayjs from 'dayjs';
import { UsersService } from '@/service/users/users.service';

const pubSub = new PubSub();

@Resolver('Schedules')
export class SchedulesResolver {
  constructor(
    private readonly schedulesService: SchedulesService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query('findSchedules')
  async findSchedules(
    @Args('startDate') startDate: number,
    @Args('endDate') endDate: number,
    @Args('seat') seat: string,
    @Args('user') user: string,
  ): Promise<Schedule[]> {
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

    const data = await this.schedulesService.query(query);
    return data;
  }

  @Query('findSchedule')
  async findSchedule(@Args('_id') _id: string): Promise<Schedule> {
    const data = await this.schedulesService.findById(_id);
    return data;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('createSchedule')
  async createSchedule(
    @CurrentUser() currentUser: SignUserPayload,
    @Args('input') input: CreateScheduleDto,
  ): Promise<Schedule | null> {
    // 校验权限
    let userId = input.user;
    if (userId) {
      let hasAuth = false;
      if (currentUser._id === input.user) {
        hasAuth = true;
      } else {
        const userObj = await this.userService.findById(currentUser._id);
        if (userObj.tags.includes('SeatSelectionAdmin')) {
          hasAuth = true;
        }
      }
      if (!hasAuth) {
        throw new ApolloError('403 Forbidden');
      }
    } else {
      userId = currentUser._id;
    }

    // 创建或更新数据
    const query = { user: userId, date: input.date };
    const update = { status: input.status };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    const createdSchedule = await this.schedulesService.findOneAndUpdate(
      query,
      update,
      options,
    );

    pubSub.publish('scheduleCreated', {
      scheduleCreated: createdSchedule,
    });

    return createdSchedule;
  }

  @Subscription('scheduleCreated')
  scheduleCreated() {
    return pubSub.asyncIterator('scheduleCreated');
  }
}