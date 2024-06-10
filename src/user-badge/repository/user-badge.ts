import { PrismaService } from "src/prisma/prisma.service";

export class UserBadgeRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(addBadgeDto: { userId: number; badgeId: number }) {
    return this.prisma.userBadge .create({ data: addBadgeDto });
  }

  async getUserWithBadges(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        badges: {
          include: {
            badge: true,
          },
        },
      },
    });
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

}
