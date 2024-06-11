import { Injectable } from "@nestjs/common";
import { Badge } from "src/badges/entity/Badge";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "src/users/entity/User";

@Injectable()
export class UserBadgeRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(addBadgeIdDto: { userId: number; badgeId: number }) {
    return this.prisma.userBadge.create({ data: addBadgeIdDto });
  }

  async findBadgeByUserId(userId: number ): Promise<Badge[] | null> {
    const badge = await this.prisma.userBadge.findMany({
      where: {
        userId
      },
      include: {
        badge: true
      }
    })

    const badges = badge.map(e => new Badge({
      id: e.badge.id,
      slug: e.badge.slug,
      name: e.badge.name,
      imageUrl: e.badge.imageUrl
   }));

    return badges
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
}
