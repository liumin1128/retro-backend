import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      return await mongoose.connect(
        'mongodb://react:123456@localhost:27017/react',
        { useNewUrlParser: true, useUnifiedTopology: true },
      );
    },
  },
];
