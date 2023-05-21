import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from './roles.dto';
import { Role, RoleDocument } from './roles.schema';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private readonly rolesModel: Model<RoleDocument>,
  ) {}
  async create(createRoleDto: CreateRoleDto): Promise<RoleDocument> {
    const createdRole = new this.rolesModel(createRoleDto);
    await createdRole.save();
    return createdRole;
  }

  async findAll(): Promise<RoleDocument[]> {
    return this.rolesModel.find();
  }

  async findOne(user: string, object: string): Promise<RoleDocument> {
    return this.rolesModel.findOne({ user, object });
  }

  async findById(_id: string): Promise<RoleDocument> {
    return this.rolesModel.findById(_id);
  }
}
