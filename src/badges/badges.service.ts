import { HttpException, Injectable } from '@nestjs/common';
import { BadgesRepository } from './repository/badges';
import { CreateBadgeDto } from './dtos/create-badge.dto';
import { BadgeDto } from 'src/user-badge/dtos/badge.dto';
import { Badge } from './entity/Badge';
import { UpdateBadgeDto } from './dtos/update-badge.dto';

@Injectable()
export class BadgesService {
  constructor(private readonly repository: BadgesRepository) { }

  async paginate(page: number, size: number, sort: string, order: string, search: string) {
    try{
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
  } catch (error) {
    throw new HttpException(error.message, 400);
  }
  }

  async create(createBadgeDto: CreateBadgeDto): Promise<BadgeDto | null> {
    try{
    const existBadge = await this.repository.findBySlug(createBadgeDto.slug);

    
    if(existBadge) {
      throw new HttpException('Badge ja existente', 409);
    }
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
  } catch (error) {
    throw new HttpException(error.message, error.status);
  }
  }

  async update(id: number, updateBadgeDto: UpdateBadgeDto): Promise<BadgeDto | null> {
    try {
      const badge = await this.repository.findById(id);
      if (!badge) {
        throw new HttpException('Badge inexistente', 404);
      }

      const newUpdateBadge = new Badge({
        slug: updateBadgeDto.slug,
        name: updateBadgeDto.name,
        imageUrl: updateBadgeDto.imageUrl
      })
      const updatedBadge = await this.repository.update(id, newUpdateBadge);

      return {
        id: updatedBadge.id,
        slug: updatedBadge.slug,
        name: updatedBadge.name,
        imageUrl: updatedBadge.imageUrl,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findBySlug(slug: string): Promise<BadgeDto | null> {
    try{
    const badge = await this.repository.findBySlug(slug);
    if(!badge) {
      throw new HttpException('Badge inexistente', 400);
    }

    return {
      id: badge.id,
      slug: badge.slug,
      name: badge.name,
      imageUrl: badge.imageUrl
    }
  } catch (error) {
    throw new HttpException(error.message, 400);
  }
  }
}
