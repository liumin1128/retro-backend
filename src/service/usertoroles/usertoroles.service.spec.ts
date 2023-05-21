import { Test, TestingModule } from '@nestjs/testing';
import { UserToRolesService } from './usertoroles.service';

describe('UserToRolesService', () => {
  let service: UserToRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserToRolesService],
    }).compile();

    service = module.get<UserToRolesService>(UserToRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
