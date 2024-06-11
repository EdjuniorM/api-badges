import { Injectable } from '@nestjs/common';
import { BadgesRepository } from './repository/badges';
import { CreateBadgeDto } from './dtos/create-badge.dto';
import { BadgeDto } from 'src/user-badge/dtos/badge.dto';
import { Badge } from './entity/Badge';

@Injectable()
export class BadgesService {
  constructor(private readonly repository: BadgesRepository) { }

  async paginate(page: number, size: number, sort: string, order: string, search: string) {
    const { result, totalItems } = await this.repository.paginate(page, size, sort, order, search);

    const totalPages = Math.ceil(totalItems / size);
    const currentPage = Number(page);

    return {
      result,
      pagination: {
        totalCount: totalItems,
        pageCount: totalPages,
        currentPage: currentPage,
        perPage: size,
      },
    };
  }

  async create(createBadgeDto: CreateBadgeDto): Promise<BadgeDto | null> {
    const createBadge = new Badge({
      slug: createBadgeDto.slug,
      name: createBadgeDto.name,
      imageUrl: createBadgeDto.imageUrl
    })
    const badge = await this.repository.create(createBadge);

    return {
      id: badge.id,
      slug: badge.slug,
      name: badge.name,
      imageUrl: badge.imageUrl
    }
  }

  async findBySlug(slug: string): Promise<BadgeDto | null> {
    const badge = await this.repository.findBySlug(slug);

    return {
      id: badge.id,
      slug: badge.slug,
      name: badge.name,
      imageUrl: badge.imageUrl
    }


  }
}
