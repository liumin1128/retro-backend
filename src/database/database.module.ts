// // import { Module } from '@nestjs/common';
// // import { databaseProviders } from './database.providers';

// // @Module({
// //   providers: [...databaseProviders],
// //   exports: [...databaseProviders],
// // })
// // export class DatabaseModule {}

// import { MongooseModule } from '@nestjs/mongoose';

// export const DatabaseModule = MongooseModule.forRoot(
//   'mongodb://react:123456@localhost:27017/react',
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
// );
