import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from '@/app.controller';
<<<<<<< HEAD
import { GraphqlModule } from '@/graphql/graphql.module';
import services from '@/service/modules';
=======
import serviceModules from '@/service/modules';
>>>>>>> d195413 (fix: 更新文件结构)

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: './src/graphql/graphql.schema.ts',
        outputAs: 'class',
      },
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),

<<<<<<< HEAD
    GraphqlModule,

    ...services,
=======
    ...serviceModules,
>>>>>>> d195413 (fix: 更新文件结构)
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
