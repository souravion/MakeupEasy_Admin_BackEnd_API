import { Test, TestingModule } from '@nestjs/testing';
import { AdminAuthController } from './admin_auth.controller';
import { AdminAuthService } from './admin_auth.service';

describe('AdminAuthController', () => {
  let controller: AdminAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminAuthController],
      providers: [AdminAuthService],
    }).compile();

    controller = module.get<AdminAuthController>(AdminAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
