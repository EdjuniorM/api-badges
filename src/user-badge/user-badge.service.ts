import { HttpException, Injectable } from '@nestjs/common';
import { UserBadgeRepository } from './repository/user-badge';
import { AddBadgeDto } from './dtos/add-badge.dto';

@Injectable()
export class UserBadgeService {
  constructor(private readonly repository: UserBadgeRepository) { }

  async create(addBadgeDto: { userId: number; badgeId: number}) {
    try {
      return this.repository.create(addBadgeDto);
    } catch (error) {
      throw new HttpException(`Não foi possível adicionar o badge ${addBadgeDto.badgeId}`, 400);
    }
  }

  async getUserWithBadges(userId: number) {
    try {
      return this.repository.getUserWithBadges(userId);
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