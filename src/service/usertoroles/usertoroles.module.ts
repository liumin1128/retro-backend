import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserToRolesService } from './usertoroles.service';
import { UserToRolesResolver } from './usertoroles.resolver';
import { UserToRole, UserToRoleSchema } from './usertoroles.schema';
import { UserToRolesController } from './usertoroles.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserToRole.name, schema: UserToRoleSchema },
    ]),
  ],
  providers: [UserToRolesService, UserToRolesResolver],
  exports: [UserToRolesService],
  controllers: [UserToRolesController],
})
export class UserToRolesModule {}
