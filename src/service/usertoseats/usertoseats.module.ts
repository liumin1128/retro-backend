import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserToSeatsService } from './userToSeats.service';
import { UserToSeatsResolver } from './userToSeats.resolver';
import { UserToSeat, UserToSeatSchema } from './userToSeats.schema';
import { UserToSeatsController } from './userToSeats.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserToSeat.name, schema: UserToSeatSchema },
    ]),
  ],
  providers: [UserToSeatsService, UserToSeatsResolver],
  exports: [UserToSeatsService],
  controllers: [UserToSeatsController],
})
export class UserToSeatsModule {}
