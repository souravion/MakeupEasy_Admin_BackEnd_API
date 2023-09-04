import { Test, TestingModule } from '@nestjs/testing';
import { BannarsService } from './bannars.service';

describe('BannarsService', () => {
  let service: BannarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BannarsService],
    }).compile();

    service = module.get<BannarsService>(BannarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
