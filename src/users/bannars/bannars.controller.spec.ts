import { Test, TestingModule } from '@nestjs/testing';
import { BannarsController } from './bannars.controller';
import { BannarsService } from './bannars.service';

describe('BannarsController', () => {
  let controller: BannarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BannarsController],
      providers: [BannarsService],
    }).compile();

    controller = module.get<BannarsController>(BannarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
