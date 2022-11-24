import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RetrosService } from '@/service/retros/retros.service';
import { RetrosResolver } from '@/service/retros/retros.resolver';
import { Retro, RetroSchema } from '@/service/retros/retros.schema';
import { RetrosController } from '@/service/retros/retros.controller';
import {
  RetroMessage,
  RetroMessageSchema,
} from '@/service/retros/messages/schema';

import {
  UserToOrganization,
  UserToOrganizationSchema,
} from '@/service/usertoorganizations/usertoorganizations.schema';
import { UserToOrganizationModule } from '../usertoorganizations/usertoorganizations.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Retro.name, schema: RetroSchema }]),
    MongooseModule.forFeature([
      { name: RetroMessage.name, schema: RetroMessageSchema },
    ]),
    MongooseModule.forFeature([
      { name: UserToOrganization.name, schema: UserToOrganizationSchema },
    ]),
    UserToOrganizationModule,
  ],
  providers: [RetrosService, RetrosResolver],
  exports: [RetrosService],
  controllers: [RetrosController],
})
export class RetrosModule {}
