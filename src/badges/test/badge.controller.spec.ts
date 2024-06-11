import { Test, TestingModule } from '@nestjs/testing';
import { BadgesController } from '../badges.controller';
import { BadgesService } from '../badges.service';
import { CreateBadgeDto } from '../dtos/create-badge.dto';

describe('BadgesController', () => {
  let controller: BadgesController;
  let service: BadgesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BadgesController],
      providers: [
        {
          provide: BadgesService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BadgesController>(BadgesController);
    service = module.get<BadgesService>(BadgesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a badge', async () => {
      const createBadgeDto: CreateBadgeDto = { slug: 'test-slug', name: 'Test Badge', imageUrl: 'http://example.com/image.png' };
      const expectedResult = { ...createBadgeDto, id: 1 };

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      expect(await controller.create(createBadgeDto)).toEqual(expectedResult);
    });
  });
});
