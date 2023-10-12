// import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard, CurrentUser } from '@/service/auth/auth.guard';
import { SignUserPayload } from '@/service/auth/auth.service';
import { ApolloError } from 'apollo-server';
import { ScheduleDocument as Schedule } from './schedules.schema';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './schedules.dto';
import { removeEmptyValue } from '@/utils/common';
import * as dayjs from 'dayjs';
import { UsersService } from '@/service/users/users.service';
import { UserToSeatsService } from '@/service/usertoseats/usertoseats.service';
import { pubSub } from '@/utils/subscription';

@Resolver('Schedules')
export class SchedulesResolver {
  constructor(
    private readonly schedulesService: SchedulesService,
    private readonly userService: UsersService,
    private readonly userToSeatsService: UserToSeatsService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query('findSchedules')
  async findSchedules(
    @Args('startDate') startDate: number,
    @Args('endDate') endDate: number,
    @Args('user') user: string,
  ): Promise<Schedule[]> {
    const start = startDate;
    const end = endDate || startDate;

    const query = removeEmptyValue({
      $and: [
        { date: { $gte: start } },
        { date: { $lte: dayjs(end).endOf('day') }.valueOf() },
      ],
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
    const update = { status: input.status, comment: input.comment };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    const createdSchedule = await this.schedulesService.findOneAndUpdate(
      query,
      update,
      options,
    );

    pubSub.publish('scheduleCreated', {
      scheduleCreated: createdSchedule,
    });

    // 如果当天存在选座记录，一并清除
    const userToSeatDeleted = await this.userToSeatsService.userToSeatsModel
      .findOneAndDelete({
        date: input.date,
        user: userId,
      })
      .populate('user')
      .populate('seat');

    // 如果清除选座记录，分发通知
    if (userToSeatDeleted) {
      pubSub.publish('userToSeatDeleted', {
        userToSeatDeleted: userToSeatDeleted,
      });
    }

    return createdSchedule;
  }

  @Subscription('scheduleCreated', {
    filter: (payload, variables) => {
      const { startDate, endDate } = variables;
      const start = startDate;
      const end = endDate || startDate;
      const date = dayjs(payload.scheduleCreated.date).valueOf();

      if (variables.user && payload.scheduleCreated.user !== variables.user) {
        return false;
      }
      if (start > date || end < date) {
        return false;
      }
      return true;
    },
  })
  scheduleCreated() {
    return pubSub.asyncIterator('scheduleCreated');
  }
}
