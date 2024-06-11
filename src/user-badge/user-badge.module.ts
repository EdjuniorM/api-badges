import { Module } from '@nestjs/common';
import { UserBadgeService } from './user-badge.service';
import { UserBadgeController } from './user-badge.controller';
import { UserBadgeRepository } from './repository/user-badge';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BadgesModule } from 'src/badges/badges.module';

@Module({
  imports: [PrismaModule, BadgesModule],
  providers: [UserBadgeService, UserBadgeRepository],
  controllers: [UserBadgeController]
})
export class UserBadgeModule {}
