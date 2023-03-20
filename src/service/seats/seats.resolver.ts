// import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { SeatDocument as Seat } from './seats.schema';
import { SeatsService } from './seats.service';

@Resolver('Seats')
export class SeatsResolver {
  constructor(private readonly seatsService: SeatsService) {}

  @Query('findSeats')
  async findSeats(): Promise<Seat[]> {
    return await this.seatsService.findAll();
  }

  @Query('findSeat')
  async findSeat(@Args('_id') _id: string): Promise<Seat> {
    return await this.seatsService.findById(_id);
  }
}
