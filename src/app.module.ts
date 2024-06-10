import { Module } from '@nestjs/common';
import { BadgesModule } from './badges/badges.module';
import { UsersModule } from './users/users.module';
import { UserBadgeModule } from './user-badge/user-badge.module';
import { PrismaModule } from './prisma/prisma.module';
import { BadgesController } from './badges/badges.controller';
import { BadgesService } from './badges/badges.service';
import { BadgesRepository } from './badges/repository/badges';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BadgesModule, UsersModule, UserBadgeModule, PrismaModule, AuthModule],
  // controllers: [BadgesController],
  // providers: [BadgesService, BadgesRepository],
})
export class AppModule {}
