import { Test, TestingModule } from '@nestjs/testing';
import { UserToRolesController } from './usertoroles.controller';

describe('UserToRolesController', () => {
  let controller: UserToRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserToRolesController],
    }).compile();

    controller = module.get<UserToRolesController>(UserToRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
