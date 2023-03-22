// import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard, CurrentUser } from '@/service/auth/auth.guard';
import { SignUserPayload } from '@/service/auth/auth.service';
import { UserToSeatDocument as UserToSeat } from './userToSeats.schema';
import { UserToSeatsService } from './userToSeats.service';
import { CreateUserToSeatDto } from './userToSeats.dto';

@Resolver('UserToSeats')
export class UserToSeatsResolver {
  constructor(private readonly userToSeatsService: UserToSeatsService) {}

  @Query('findUserToSeats')
  async findUserToSeats(): Promise<UserToSeat[]> {
    const data = await this.userToSeatsService.findAll();
    return data;
  }

  @Query('findUserToSeat')
  async findUserToSeat(@Args('_id') _id: string): Promise<UserToSeat> {
    const data = await this.userToSeatsService.findById(_id);
    return data;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('createUserToSeat')
  async createUserToSeat(
    @CurrentUser() user: SignUserPayload,
    @Args('input') input: CreateUserToSeatDto,
  ): Promise<UserToSeat | null> {
    const createdUserToSeat = await this.userToSeatsService.create({
      user,
      ...input,
    });

    return createdUserToSeat;
  }
}
