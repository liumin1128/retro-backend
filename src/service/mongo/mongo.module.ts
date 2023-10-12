import { Module } from '@nestjs/common';
import { UserToSeatsService } from '@/service/usertoseats/usertoseats.service';
import { SchedulesService } from '@/service/schedule/schedules.service';

@Module({
  providers: [SchedulesService, UserToSeatsService],
  exports: [SchedulesService, UserToSeatsService],
})
export class MongoModule {}
