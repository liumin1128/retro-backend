import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RetrosService } from './retros.service';
import { RetrosResolver } from './retros.resolver';
import { Retro, RetroSchema } from './retros.schema';
import { RetrosController } from './retros.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Retro.name, schema: RetroSchema }]),
  ],
  providers: [RetrosService, RetrosResolver],
  exports: [RetrosService],
  controllers: [RetrosController],
})
export class RetrosModule {}
