// import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { UsertoseatDocument as Usertoseat } from './usertoseats.schema';
import { UsertoseatsService } from './usertoseats.service';

@Resolver('Usertoseats')
export class UsertoseatsResolver {
  constructor(private readonly usertoseatsService: UsertoseatsService) {}

  @Query('findUsertoseats')
  async findUsertoseats(): Promise<Usertoseat[]> {
    return await this.usertoseatsService.findAll();
  }

  @Query('findUsertoseat')
  async findUsertoseat(@Args('_id') _id: string): Promise<Usertoseat> {
    return await this.usertoseatsService.findById(_id);
  }
}
