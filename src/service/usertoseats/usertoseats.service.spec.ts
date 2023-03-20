import { Test, TestingModule } from '@nestjs/testing';
import { UsertoseatsService } from './usertoseats.service';

describe('UsertoseatsService', () => {
  let service: UsertoseatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsertoseatsService],
    }).compile();

    service = module.get<UsertoseatsService>(UsertoseatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
