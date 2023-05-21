import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { Role, RoleSchema } from './roles.schema';
import { RolesController } from './roles.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  providers: [RolesService, RolesResolver],
  exports: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}
