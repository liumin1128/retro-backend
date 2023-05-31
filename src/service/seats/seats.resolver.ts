// import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/service/auth/auth.guard';
import { SeatDocument as Seat } from './seats.schema';
import { SeatsService } from './seats.service';
import { CreateSeatDto, UpdateSeatDto } from './seats.dto';

@Resolver('Seats')
export class SeatsResolver {
  constructor(private readonly seatsService: SeatsService) {}

  @Query('findSeats')
  async findSeats(): Promise<Seat[]> {
    const data = await this.seatsService.findAll();
    return data;
  }

  @Query('findSeat')
  async findSeat(@Args('_id') _id: string): Promise<Seat> {
    const data = await this.seatsService.findById(_id);
    return data;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('createSeat')
  async createSeat(@Args('input') input: CreateSeatDto): Promise<Seat | null> {
    const createdSeat = await this.seatsService.create({
      ...input,
    });

    return createdSeat;
  }

  // todo: 鉴权，或许可以使用graphql的指令模式

  @UseGuards(GqlAuthGuard)
  @Mutation('updateSeat')
  async updateSeat(
    @Args('id') id: string,
    @Args('input') input: UpdateSeatDto,
  ): Promise<any> {
    console.log('updateSeat', id, input);
    return this.seatsService.updateSeat(id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('setSeatsTags')
  async setSeatsTags(
    @Args('ids') ids: string[],
    @Args('tags') tags: string[],
  ): Promise<any> {
    return this.seatsService.setSeatsTags(ids, tags);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('pushSeatsTags')
  async pushSeatsTags(
    @Args('ids') ids: string[],
    @Args('tags') tags: string[],
  ): Promise<any> {
    return this.seatsService.pushSeatsTags(ids, tags);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('pullSeatsTags')
  async pullSeatsTags(
    @Args('ids') ids: string[],
    @Args('tags') tags: string[],
  ): Promise<any> {
    return this.seatsService.pullSeatsTags(ids, tags);
  }
}
