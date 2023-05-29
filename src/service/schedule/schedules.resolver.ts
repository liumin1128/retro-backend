// import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard, CurrentUser } from '@/service/auth/auth.guard';
import { SignUserPayload } from '@/service/auth/auth.service';
import { ScheduleDocument as Schedule } from './schedules.schema';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './schedules.dto';
import { removeEmptyValue } from '@/utils/common';
import * as dayjs from 'dayjs';

@Resolver('Schedules')
export class SchedulesResolver {
  constructor(private readonly schedulesService: SchedulesService) {}

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
    @CurrentUser() user: SignUserPayload,
    @Args('input') input: CreateScheduleDto,
  ): Promise<Schedule | null> {
    // 创建或更新数据
    const query = { user: user._id, date: input.date };
    const update = { status: input.status };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    const createdSchedule = await this.schedulesService.findOneAndUpdate(
      query,
      update,
      options,
    );

    return createdSchedule;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('adminCreateSchedule')
  async adminCreateSchedule(
    @Args('input') input: CreateScheduleDto,
  ): Promise<Schedule | null> {
    // 创建或更新数据
    const query = { user: input.user, date: input.date };
    const update = { status: input.status };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    const createdSchedule = await this.schedulesService.findOneAndUpdate(
      query,
      update,
      options,
    );

    return createdSchedule;
  }
}
