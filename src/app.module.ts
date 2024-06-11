import { Module } from '@nestjs/common';
import { BadgesModule } from './badges/badges.module';
import { UsersModule } from './users/users.module';
import { UserBadgeModule } from './user-badge/user-badge.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [BadgesModule, UsersModule, UserBadgeModule, PrismaModule, AuthModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
  ],
  providers: [
    {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],

})
export class AppModule {}
