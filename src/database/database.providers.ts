import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      return await mongoose.connect(process.env.MONGODB_PATH, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    },
  },
];
