import { Test, TestingModule } from '@nestjs/testing';
import { WchatService } from './wechat.service';

describe('WchatService', () => {
  let service: WchatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WchatService],
    }).compile();

    service = module.get<WchatService>(WchatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
