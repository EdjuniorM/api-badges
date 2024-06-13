import { HttpException, Injectable } from '@nestjs/common';
import { UserBadgeRepository } from './repository/user-badge';
import { BadgesService } from 'src/badges/badges.service';
import { BadgeDto } from './dtos/badge.dto';

@Injectable()
export class UserBadgeService {
  constructor(
    private readonly repository: UserBadgeRepository,
    private readonly badgesService: BadgesService
  ) { }

  async create(addBadgeDto: { userId: number; badgeSlug: string}) {
    try {
      const badge = await this.badgesService.findBySlug(addBadgeDto.badgeSlug);
      if (!badge) {
        throw new HttpException(`Badge ${addBadgeDto.badgeSlug} inexistente`, 400);
      }
      const hasBadge = await this.repository.hasBadge(addBadgeDto.userId, badge.id);
      if (hasBadge) {
        throw new HttpException(`Badge ${addBadgeDto.badgeSlug} ja adicionado`, 400);
      }

      const addBadgeIdDto = { userId: addBadgeDto.userId, badgeId: badge.id };
      return this.repository.create(addBadgeIdDto);
    } catch (error) {
      throw new HttpException(`Não foi possível adicionar o badge: ${error.message}`, 400);
    }
  }

  async findBadgeByUserId(page: number, size: number, sort: string, order: string, search: string, userId: number) {
    try {
      const { result, totalItems } = await this.repository.findBadgeByUserId(page, size, sort, order, search, userId);
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
      throw new HttpException(`Não foi possível obter badges do usuário ${userId}`, 400);
    }
  }

  async removeBadge(userId: number, badgeId: number) {
    try {
      return this.repository.removeBadge(userId, badgeId);
    } catch (error) {
      throw new HttpException(`Não foi possível remover o badge ${badgeId} do usuário ${userId}`, 400);
    }
  }

  async getUserBadges(userId: number) {
    try {
      return this.repository.getUserBadges(userId);
    } catch (error) {
      throw new HttpException(`Não foi possível obter badges do usuário ${userId}`, 400);
    }
  }
}