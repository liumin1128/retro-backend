import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsertoseatsService } from './usertoseats.service';
import { UsertoseatsResolver } from './usertoseats.resolver';
import { Usertoseat, UsertoseatSchema } from './usertoseats.schema';
import { UsertoseatsController } from './usertoseats.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Usertoseat.name, schema: UsertoseatSchema },
    ]),
  ],
  providers: [UsertoseatsService, UsertoseatsResolver],
  exports: [UsertoseatsService],
  controllers: [UsertoseatsController],
})
export class UsertoseatsModule {}
