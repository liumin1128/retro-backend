import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RetroMessagesService } from './service';
import { RetroMessagesResolver } from './resolver';
import { RetroMessage, RetroMessageSchema } from './schema';
import { RetroMessagesController } from './controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RetroMessage.name, schema: RetroMessageSchema },
    ]),
  ],
  providers: [RetroMessagesService, RetroMessagesResolver],
  exports: [RetroMessagesService],
  controllers: [RetroMessagesController],
})
export class RetroMessagesModule {}
