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

  async findBadgeByUserId(userId: number): Promise<BadgeDto[] | null> {
    try {
      const badges = await this.repository.findBadgeByUserId(userId);

      const badgesDto = badges.map(e => ({
        id: e.id,
        slug: e.slug,
        name: e.name,
        imageUrl: e.imageUrl,
      }));
      
      return badgesDto;
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
}