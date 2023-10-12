import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserToSeatsResolver } from './usertoseats.resolver';
import { UserToSeatsController } from './usertoseats.controller';
import { UserModule } from '@/service/users/users.module';

import { Schedule, ScheduleSchema } from '@/service/schedule/schedules.schema';
import { Seat, SeatSchema } from '@/service/seats/seats.schema';
import {
  UserToSeat,
  UserToSeatSchema,
} from '@/service/usertoseats/usertoseats.schema';

import { SchedulesService } from '@/service/schedule/schedules.service';
import { SeatsService } from '@/service/seats/seats.service';
import { UserToSeatsService } from '@/service/usertoseats/usertoseats.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserToSeat.name, schema: UserToSeatSchema },
      { name: Schedule.name, schema: ScheduleSchema },
      { name: Seat.name, schema: SeatSchema },
    ]),
    UserModule,
  ],
  providers: [
    UserToSeatsService,
    UserToSeatsResolver,
    SchedulesService,
    SeatsService,
  ],
  exports: [UserToSeatsService],
  controllers: [UserToSeatsController],
})
export class UserToSeatsModule {}
