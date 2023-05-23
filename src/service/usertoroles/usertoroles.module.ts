import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserToRolesService } from './usertoroles.service';
import { UserToRolesResolver } from './usertoroles.resolver';
import { UserToRole, UserToRoleSchema } from './usertoroles.schema';
import { User, UserSchema } from '@/service/users/schemas/users.schema';
import { UserToRolesController } from './usertoroles.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserToRole.name, schema: UserToRoleSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserToRolesService, UserToRolesResolver],
  exports: [UserToRolesService],
  controllers: [UserToRolesController],
})
export class UserToRolesModule {}
