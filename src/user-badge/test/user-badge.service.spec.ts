import { Test, TestingModule } from '@nestjs/testing';
import { UserBadgeService } from '../user-badge.service';
import { BadgesService } from 'src/badges/badges.service';
import { HttpException } from '@nestjs/common';
import { UserBadgeRepository } from '../repository/user-badge';
import { Badge } from 'src/badges/entity/Badge';

describe('UserBadgeService', () => {
  let service: UserBadgeService;
  let repository: UserBadgeRepository;
  let badgesService: BadgesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserBadgeService,
        {
          provide: UserBadgeRepository,
          useValue: {
            create: jest.fn(),
            hasBadge: jest.fn(),
            findBadgeByUserId: jest.fn(),
            removeBadge: jest.fn(),
          },
        },
        {
          provide: BadgesService,
          useValue: {
            findBySlug: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserBadgeService>(UserBadgeService);
    repository = module.get<UserBadgeRepository>(UserBadgeRepository);
    badgesService = module.get<BadgesService>(BadgesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should add a badge to a user', async () => {
      const addBadgeDto = { userId: 1, badgeSlug: 'test-badge' };
      const badge = { id: 1, slug: 'test-badge', name: 'Test Badge', imageUrl: 'http://example.com/image.png' };

      jest.spyOn(badgesService, 'findBySlug').mockResolvedValue(badge);
      jest.spyOn(repository, 'hasBadge').mockResolvedValue(false);
      jest.spyOn(repository, 'create').mockResolvedValue(null);

      const result = await service.create(addBadgeDto);

      expect(result).toBeNull();
      expect(badgesService.findBySlug).toHaveBeenCalledWith(addBadgeDto.badgeSlug);
      expect(repository.hasBadge).toHaveBeenCalledWith(addBadgeDto.userId, badge.id);
      expect(repository.create).toHaveBeenCalledWith({ userId: addBadgeDto.userId, badgeId: badge.id });
    });

    it('should throw an error if the badge does not exist', async () => {
      const addBadgeDto = { userId: 1, badgeSlug: 'nonexistent-badge' };

      jest.spyOn(badgesService, 'findBySlug').mockResolvedValue(null);

      await expect(service.create(addBadgeDto)).rejects.toThrow(HttpException);
    });

    it('should throw an error if the user already has the badge', async () => {
      const addBadgeDto = { userId: 1, badgeSlug: 'test-badge' };
      const badge = { id: 1, slug: 'test-badge', name: 'Test Badge', imageUrl: 'http://example.com/image.png' };

      jest.spyOn(badgesService, 'findBySlug').mockResolvedValue(badge);
      jest.spyOn(repository, 'hasBadge').mockResolvedValue(true);

      await expect(service.create(addBadgeDto)).rejects.toThrow(HttpException);
    });
  });

  describe('findBadgeByUserId', () => {
    it('should return paginated badges for a user', async () => {
      const page = 1;
      const size = 10;
      const sort = 'name';
      const order = 'asc';
      const search = '';
      const userId = 1;

      const badges = [
        new Badge({ id: 1, slug: 'test-badge', name: 'Test Badge', imageUrl: 'http://example.com/image.png' }),
      ];

      const paginatedResult = {
        result: badges,
        pagination: {
          totalCount: 1,
          pageCount: 1,
          currentPage: page,
          perPage: size,
        },
      };

      jest.spyOn(repository, 'findBadgeByUserId').mockResolvedValue({ result: badges, totalItems: 1 });

      const result = await service.findBadgeByUserId(page, size, sort, order, search, userId);

      expect(result).toEqual(paginatedResult);
      expect(repository.findBadgeByUserId).toHaveBeenCalledWith(page, size, sort, order, search, userId);
    });
  });
  describe('removeBadge', () => {
    it('should remove a badge from a user', async () => {
      const userId = 1;
      const badgeId = 1;

      jest.spyOn(repository, 'removeBadge').mockResolvedValue(null);

      const result = await service.removeBadge(userId, badgeId);

      expect(result).toBeNull();
      expect(repository.removeBadge).toHaveBeenCalledWith(userId, badgeId);
    });
  });

  });
  




