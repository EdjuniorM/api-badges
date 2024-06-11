import { Module } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { BadgesController } from './badges.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BadgesRepository } from './repository/badges';

@Module({
  imports: [PrismaModule],
  providers: [BadgesService, BadgesRepository],
  controllers: [BadgesController],
  exports: [BadgesService]
})
export class BadgesModule {}
