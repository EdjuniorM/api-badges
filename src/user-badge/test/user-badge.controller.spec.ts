import { Test, TestingModule } from '@nestjs/testing';
import { UserBadgeController } from '../user-badge.controller';
import { UserBadgeService } from '../user-badge.service';
import { AddBadgeDto } from '../dtos/add-badge.dto';
import { Badge } from 'src/badges/entity/Badge';

describe('UserBadgeController', () => {
  let controller: UserBadgeController;
  let service: UserBadgeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBadgeController],
      providers: [
        {
          provide: UserBadgeService,
          useValue: {
            create: jest.fn(),
            findBadgeByUserId: jest.fn(),
            removeBadge: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserBadgeController>(UserBadgeController);
    service = module.get<UserBadgeService>(UserBadgeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addBadge', () => {
    it('should add a badge to a user', async () => {
      const req = { user: { sub: 1 } };
      const addBadgeDto: AddBadgeDto = { badgeSlug: 'test-badge' };

      jest.spyOn(service, 'create').mockResolvedValue(null);

      const result = await controller.addBadge(req, addBadgeDto);

      expect(result).toBeNull();
      expect(service.create).toHaveBeenCalledWith({ userId: req.user.sub, badgeSlug: addBadgeDto.badgeSlug });
    });
  });

  describe('findBadgeByUserId', () => {
    it('should return paginated badges for current user', async () => {
      const req = { user: { sub: 1 }, query: { page: '1', size: '10', sort: 'name', order: 'asc', search: '' } };
      const badges = [
        new Badge({ id: 1, slug: 'test-badge', name: 'Test Badge', imageUrl: 'http://example.com/image.png' }),
      ];

      const paginatedResult = {
        result: badges,
        pagination: {
          totalCount: 1,
          pageCount: 1,
          currentPage: 1,
          perPage: 10,
        },
      };

      jest.spyOn(service, 'findBadgeByUserId').mockResolvedValue(paginatedResult);

      expect(await controller.findBadgeByUserId(req)).toBe(paginatedResult);
      expect(service.findBadgeByUserId).toHaveBeenCalledWith(1, 10, 'name', 'asc', '', 1);
    });
  });

  describe('removeBadge', () => {
    it('should remove a badge from a user', async () => {
      const req = { user: { sub: 1 } };
      const badgeId = 1;

      jest.spyOn(service, 'removeBadge').mockResolvedValue(null);

      const result = await controller.removeBadge(req, badgeId);

      expect(result).toBeNull();
      expect(service.removeBadge).toHaveBeenCalledWith(req.user.sub, badgeId);
    });
  });
});
