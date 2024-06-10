import { Module } from '@nestjs/common';
import { UserBadgeService } from './user-badge.service';
import { UserBadgeController } from './user-badge.controller';
import { UserBadgeRepository } from './repository/user-badge';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserBadgeService, UserBadgeRepository],
  controllers: [UserBadgeController]
})
export class UserBadgeModule {}
