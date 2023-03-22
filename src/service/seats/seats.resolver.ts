// import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard, CurrentUser } from '@/service/auth/auth.guard';
import { SignUserPayload } from '@/service/auth/auth.service';
import { SeatDocument as Seat } from './seats.schema';
import { SeatsService } from './seats.service';
import { CreateSeatDto } from './seats.dto';

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
  async createSeat(
    @CurrentUser() user: SignUserPayload,
    @Args('input') input: CreateSeatDto,
  ): Promise<Seat | null> {
    const createdSeat = await this.seatsService.create({
      user,
      ...input,
    });

    return createdSeat;
  }
}
