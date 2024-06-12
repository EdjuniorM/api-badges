import { Test, TestingModule } from '@nestjs/testing';
import { UserBadgeController } from '../user-badge.controller';
import { UserBadgeService } from '../user-badge.service';
import { AddBadgeDto } from '../dtos/add-badge.dto';

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
    it('should return badges for the current user', async () => {
      const req = { user: { sub: 1 } };
      const badges = [
        { id: 1, slug: 'test-badge', name: 'Test Badge', imageUrl: 'http://example.com/image.png' },
      ];

      jest.spyOn(service, 'findBadgeByUserId').mockResolvedValue(badges);

      const result = await controller.findBadgeByUserId(req);

      expect(result).toEqual(badges);
      expect(service.findBadgeByUserId).toHaveBeenCalledWith(req.user.sub);
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
