import { Test, TestingModule } from '@nestjs/testing';
import { UsertoseatsController } from './usertoseats.controller';

describe('UsertoseatsController', () => {
  let controller: UsertoseatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsertoseatsController],
    }).compile();

    controller = module.get<UsertoseatsController>(UsertoseatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
