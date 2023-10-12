import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@/service/users/users.module';
import { UserToSeatsModule } from '@/service/usertoseats/usertoseats.module';

import { SchedulesService } from './schedules.service';
import { SchedulesResolver } from './schedules.resolver';
import { Schedule, ScheduleSchema } from './schedules.schema';
import { SchedulesController } from './schedules.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Schedule.name, schema: ScheduleSchema },
    ]),
    UserToSeatsModule,
    UserModule,
  ],
  providers: [SchedulesService, SchedulesResolver],
  exports: [SchedulesService],
  controllers: [SchedulesController],
})
export class SchedulesModule {}
