import { Test, TestingModule } from '@nestjs/testing';
import { BadgeDto } from 'src/user-badge/dtos/badge.dto';
import { BadgesService } from '../badges.service';
import { BadgesRepository } from '../repository/badges';
import { CreateBadgeDto } from '../dtos/create-badge.dto';
import { Badge } from '../entity/Badge';
import { HttpException } from '@nestjs/common';
import { UpdateBadgeDto } from '../dtos/update-badge.dto';

describe('BadgesService', () => {
  let service: BadgesService;
  let repository: BadgesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BadgesService,
        {
          provide: BadgesRepository,
          useValue: {
            paginate: jest.fn(),
            create: jest.fn(),
            findBySlug: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            // delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BadgesService>(BadgesService);
    repository = module.get<BadgesRepository>(BadgesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('paginate', () => {
    it('should return paginated results', async () => {
      const paginatedResult = {
        result: [
          { id: 1, slug: 'badge-1', name: 'Badge 1', imageUrl: 'http://example.com/badge1.png' },
        ],
        totalItems: 1,
      };
      jest.spyOn(repository, 'paginate').mockResolvedValue(paginatedResult);

      const result = await service.paginate(1, 10, 'name', 'asc', 'badge');

      expect(result).toEqual({
        result: paginatedResult.result,
        pagination: {
          totalCount: paginatedResult.totalItems,
          pageCount: 1,
          currentPage: 1,
          perPage: 10,
        },
      });
    });
  });

  describe('create', () => {
    it('should create a badge', async () => {
      const createBadgeDto: CreateBadgeDto = { slug: 'test-slug', name: 'Test Badge', imageUrl: 'http://example.com/image.png' };
      const createdBadge: Badge = {
        id: 1,
        slug: 'test-slug',
        name: 'Test Badge',
        imageUrl: 'http://example.com/image.png',
      };

      jest.spyOn(repository, 'create').mockResolvedValue(createdBadge);

      const result = await service.create(createBadgeDto);

      expect(result).toEqual({
        id: createdBadge.id,
        slug: createdBadge.slug,
        name: createdBadge.name,
        imageUrl: createdBadge.imageUrl,
      });
    });
  });

  describe('findBySlug', () => {
    it('should find a badge by slug', async () => {
      const slug = 'test-slug';
      const foundBadge: Badge = {
        id: 1,
        slug: 'test-slug',
        name: 'Test Badge',
        imageUrl: 'http://example.com/image.png',
      };

      jest.spyOn(repository, 'findBySlug').mockResolvedValue(foundBadge);

      const result = await service.findBySlug(slug);

      expect(result).toEqual({
        id: foundBadge.id,
        slug: foundBadge.slug,
        name: foundBadge.name,
        imageUrl: foundBadge.imageUrl,
      });
    });

    it('should throw an HttpException if badge is not found', async () => {
      const slug = 'non-existent-slug';
      jest.spyOn(repository, 'findBySlug').mockResolvedValue(null);

      await expect(service.findBySlug(slug)).rejects.toThrow(HttpException);
      await expect(service.findBySlug(slug)).rejects.toThrow('Badge inexistente');
    });
  });

  describe('update', () => {
    it('should update a badge', async () => {
      const updateBadgeDto: UpdateBadgeDto = { name: 'Updated Badge' };
      const existingBadge: { id: number; slug: string; name: string; imageUrl: string; } = {
        id: 1,
        slug: 'test-slug',
        name: 'Test Badge',
        imageUrl: 'http://example.com/image.png',
      };
      const updatedBadge: BadgeDto = {
        ...existingBadge,
        ...updateBadgeDto,
      };

      jest.spyOn(repository, 'findById').mockResolvedValue(existingBadge);
      jest.spyOn(repository, 'update').mockResolvedValue(updatedBadge);

      const result = await service.update(existingBadge.id, updateBadgeDto);

      expect(result).toEqual({
        id: updatedBadge.id,
        slug: updatedBadge.slug,
        name: updatedBadge.name,
        imageUrl: updatedBadge.imageUrl,
      });
    });
  });

  // describe('delete', () => {
  //   it('should delete a badge', async () => {
  //     const badgeId = 60;
  //     const existingBadge: { id: number; slug: string; name: string; imageUrl: string; } = {
  //       id: 1,
  //       slug: 'test-slug',
  //       name: 'Test Badge',
  //       imageUrl: 'http://example.com/image.png',
  //     };

  //     jest.spyOn(repository, 'findById').mockResolvedValue(existingBadge);
  //     jest.spyOn(repository, 'delete').mockResolvedValue(null);

  //     const result = await service.delete(badgeId);

  //     expect(result).toBeNull();
  //     expect(repository.findById).toHaveBeenCalledWith(badgeId);
  //     expect(repository.delete).toHaveBeenCalledWith(badgeId);
  //   });

  //   it('should throw an error if badge is not found', async () => {
  //     const badgeId = 1;

  //     jest.spyOn(repository, 'findById').mockResolvedValue(null);

  //     await expect(service.delete(badgeId)).rejects.toThrow(HttpException);
  //     await expect(service.delete(badgeId)).rejects.toThrow('Badge inexistente');
  //   });
  // });
})