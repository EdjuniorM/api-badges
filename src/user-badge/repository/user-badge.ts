import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Badge } from "src/badges/entity/Badge";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "src/users/entity/User";

@Injectable()
export class UserBadgeRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(addBadgeIdDto: { userId: number; badgeId: number }) {
    return this.prisma.userBadge.create({ data: addBadgeIdDto });
  }

  async findBadgeByUserId(
    page: number,
    size: number,
    sort: string,
    order: string,
    search: string,
    userId: number
  ): Promise<{ result: Badge[]; totalItems: number }> {
    
    const skip = Math.max(0, (page - 1) * size);
    const take = size;
    const orderBy = { [sort]: order };
    const where = search
      ? {
          badge: {
            name: {
              contains: search,
              mode: 'insensitive' as Prisma.QueryMode,
            },
          },
        }
      : {};
    const userBadges = await this.prisma.userBadge.findMany({
      skip,
      take,
      orderBy,
      where: {
        userId,
        ...where
      },
      include: {
        badge: true,
      },
    });
  
    const totalItems = await this.prisma.userBadge.count({
      where: {
        userId,
        ...where
      },
    });
  
    const result = userBadges.map(e => new Badge({
      id: e.badge.id,
      slug: e.badge.slug,
      name: e.badge.name,
      imageUrl: e.badge.imageUrl
    }));
    
  
    return { result, totalItems };
  }

  async removeBadge(userId: number, badgeId: number) {
    return this.prisma.userBadge.delete({
      where: {
        badgeId_userId: {
          badgeId,
          userId
        }
      },
    });
  }

  async hasBadge(userId: number, badgeId: number): Promise<boolean> {
    const userBadge = await this.prisma.userBadge.findUnique({
      where: {
        badgeId_userId: {
          userId,
          badgeId,
        },
      },
    });
    return !!userBadge; 
  }

  async getUserBadges(userId: number) {
    const userBadges= await this.prisma.userBadge.findMany({
      where: {
        userId
      },
      include: {
        badge: true
      },
    });

    return userBadges.map(userBadge => ({
        id: userBadge.badge.id,
        slug: userBadge.badge.slug,
        name: userBadge.badge.name,
        imageUrl: userBadge.badge.imageUrl,
    }));
  }
}
