import { Test, TestingModule } from '@nestjs/testing';
import { WchatController } from './wechat.controller';

describe('WchatController', () => {
  let controller: WchatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WchatController],
    }).compile();

    controller = module.get<WchatController>(WchatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
