import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { UsersRepository } from 'src/users/repository/users';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, UsersRepository, PrismaService, 
     {
    provide: APP_GUARD,
    useClass: AuthGuard,
    }
],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}