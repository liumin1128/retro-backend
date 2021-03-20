import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AnalyseService } from './analyse/analyse.service';
// import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
// import { AnalyseController } from './analyse/analyse.controller';
// import { AnalyseModule } from './analyse/analyse.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot('mongodb://react:123456@localhost:27017/reacts'),
    CatsModule,
    // AnalyseModule,
  ],
  // controllers: [AppController, CatsController, AnalyseController],
  // providers: [AppService, AnalyseService],
})
export class AppModule {}
