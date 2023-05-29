import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchedulesService } from './schedules.service';
import { SchedulesResolver } from './schedules.resolver';
import { Schedule, ScheduleSchema } from './schedules.schema';
import { SchedulesController } from './schedules.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Schedule.name, schema: ScheduleSchema },
    ]),
  ],
  providers: [SchedulesService, SchedulesResolver],
  exports: [SchedulesService],
  controllers: [SchedulesController],
})
export class SchedulesModule {}
